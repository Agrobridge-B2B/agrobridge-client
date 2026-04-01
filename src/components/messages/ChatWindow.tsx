"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { Send, Loader2, ArrowLeft, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/upload";
import {
	getMessages,
	sendMessage as sendMessageApi,
	markConversationAsRead,
} from "@/lib/messages";
import type { Message, Conversation, MessageParticipant } from "@/lib/messages";

interface ChatWindowProps {
	conversation: Conversation;
	currentUserId: string;
	onMessageSent?: () => void;
	onBack?: () => void;
}

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((part) => part.charAt(0))
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

function formatMessageTime(dateString: string): string {
	return new Date(dateString).toLocaleTimeString("fr-FR", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

function formatDateSeparator(dateString: string): string {
	const date = new Date(dateString);
	const today = new Date();
	const yesterday = new Date();
	yesterday.setDate(today.getDate() - 1);

	if (date.toDateString() === today.toDateString()) return "Aujourd'hui";
	if (date.toDateString() === yesterday.toDateString()) return "Hier";

	return date.toLocaleDateString("fr-FR", {
		weekday: "long",
		day: "numeric",
		month: "long",
	});
}

function shouldShowDateSeparator(
	current: Message,
	previous: Message | null
): boolean {
	if (!previous) return true;
	const currentDate = new Date(current.createdAt).toDateString();
	const prevDate = new Date(previous.createdAt).toDateString();
	return currentDate !== prevDate;
}

function getSenderInfo(sender: string | MessageParticipant): {
	id: string;
	name: string;
} {
	if (typeof sender === "object" && sender !== null) {
		return { id: sender._id, name: sender.fullName };
	}
	return { id: String(sender), name: "" };
}

export function ChatWindow({
	conversation,
	currentUserId,
	onMessageSent,
	onBack,
}: ChatWindowProps) {
	const [messages, setMessages] = useState<Message[]>([]);
	const [newMessage, setNewMessage] = useState("");
	const [isLoading, setIsLoading] = useState(true);
	const [isSending, setIsSending] = useState(false);
	const messagesEndRef = useRef<HTMLDivElement>(null);
	const chatContainerRef = useRef<HTMLDivElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);

	const participant = conversation.otherParticipant;

	const scrollToBottom = useCallback(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, []);

	// Load messages when conversation changes
	useEffect(() => {
		let isMounted = true;

		async function loadMessages() {
			setIsLoading(true);
			try {
				const result = await getMessages(conversation._id);
				if (isMounted) {
					setMessages(result.messages);
				}
				await markConversationAsRead(conversation._id);
			} catch {
				// Keep chat usable even if loading fails
			} finally {
				if (isMounted) {
					setIsLoading(false);
				}
			}
		}

		loadMessages();

		return () => {
			isMounted = false;
		};
	}, [conversation._id]);

	// Auto-scroll to bottom when new messages arrive
	useEffect(() => {
		if (!isLoading) {
			scrollToBottom();
		}
	}, [messages, isLoading, scrollToBottom]);

	// Poll for new messages every 5 seconds to simulate real-time updates
	useEffect(() => {
		const interval = setInterval(async () => {
			try {
				const result = await getMessages(conversation._id);
				setMessages(result.messages);
				await markConversationAsRead(conversation._id);
			} catch {
				// Silently ignore polling failures
			}
		}, 5000);

		return () => clearInterval(interval);
	}, [conversation._id]);

	async function handleSendMessage(e: React.FormEvent) {
		e.preventDefault();

		const trimmed = newMessage.trim();
		if (!trimmed || isSending) return;

		setIsSending(true);
		setNewMessage("");

		try {
			const sentMessage = await sendMessageApi(conversation._id, trimmed);
			setMessages((prev) => [...prev, sentMessage]);
			onMessageSent?.();
			// Refocus input after sending for quick follow-up messages
			inputRef.current?.focus();
		} catch {
			setNewMessage(trimmed);
		} finally {
			setIsSending(false);
		}
	}

	// Handle Enter key to send, Shift+Enter for newline
	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSendMessage(e);
		}
	}

	return (
		<div className="flex flex-col h-full bg-white">
			{/* Chat Header */}
			<div className="flex items-center gap-3 px-4 sm:px-6 py-3.5 border-b border-gray-100 bg-white/95 backdrop-blur-sm sticky top-0 z-10">
				{/* Back button visible on mobile */}
				{onBack && (
					<button
						type="button"
						onClick={onBack}
						className="lg:hidden p-1.5 -ml-1 rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
						aria-label="Retour aux conversations"
					>
						<ArrowLeft className="w-5 h-5" />
					</button>
				)}

				{/* Participant Avatar */}
				<div className="relative shrink-0">
					{participant.profileImage ? (
						<Image
							src={getImageUrl(participant.profileImage)}
							alt={participant.fullName}
							width={40}
							height={40}
							className="w-10 h-10 rounded-full object-cover"
							unoptimized
						/>
					) : (
						<div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark flex items-center justify-center text-white font-semibold text-sm">
							{getInitials(participant.fullName)}
						</div>
					)}
					<span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
				</div>

				<div className="flex-1 min-w-0">
					<p className="text-sm font-semibold text-gray-900 truncate">
						{participant.fullName}
					</p>
					<p className="text-[11px] text-green-600 font-medium">
						En ligne
					</p>
				</div>
			</div>

			{/* Messages Area */}
			<div
				ref={chatContainerRef}
				className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 bg-gray-50/40"
			>
				{isLoading ? (
					<div className="flex items-center justify-center h-full">
						<div className="text-center">
							<Loader2 className="w-6 h-6 animate-spin text-brand-green mx-auto mb-2" />
							<p className="text-xs text-gray-400">Chargement...</p>
						</div>
					</div>
				) : messages.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-full text-center px-4">
						<div className="w-16 h-16 rounded-full bg-brand-green/10 flex items-center justify-center mb-4">
							<Send className="w-7 h-7 text-brand-green" />
						</div>
						<p className="text-sm font-medium text-gray-600">
							Démarrez la conversation
						</p>
						<p className="text-xs text-gray-400 mt-1 max-w-xs">
							Envoyez votre premier message à{" "}
							{participant.fullName}
						</p>
					</div>
				) : (
					<div className="space-y-1">
						{messages.map((message, index) => {
							const sender = getSenderInfo(message.sender);
							const isOwn = sender.id === currentUserId;
							const previousMessage =
								index > 0 ? messages[index - 1] : null;
							const showDate = shouldShowDateSeparator(
								message,
								previousMessage
							);

							// Check if next message is from same sender for grouping
							const nextMessage =
								index < messages.length - 1
									? messages[index + 1]
									: null;
							const nextSender = nextMessage
								? getSenderInfo(nextMessage.sender)
								: null;
							const isLastInGroup =
								!nextSender || nextSender.id !== sender.id;

							return (
								<div key={message._id}>
									{/* Date Separator */}
									{showDate && (
										<div className="flex items-center justify-center my-4">
											<span className="text-[11px] text-gray-400 bg-white px-3 py-1 rounded-full border border-gray-100 shadow-sm font-medium">
												{formatDateSeparator(
													message.createdAt
												)}
											</span>
										</div>
									)}

									{/* Message Bubble */}
									<div
										className={cn(
											"flex",
											isOwn
												? "justify-end"
												: "justify-start",
											isLastInGroup ? "mb-3" : "mb-0.5"
										)}
									>
										<div
											className={cn(
												"max-w-[80%] sm:max-w-[70%] px-4 py-2.5",
												isOwn
													? "bg-brand-green text-white"
													: "bg-white text-gray-800 border border-gray-100 shadow-sm",
												// Dynamic border radius for grouped messages
												isOwn
													? isLastInGroup
														? "rounded-2xl rounded-br-md"
														: "rounded-2xl rounded-r-md"
													: isLastInGroup
														? "rounded-2xl rounded-bl-md"
														: "rounded-2xl rounded-l-md"
											)}
										>
											<p className="text-[13.5px] leading-relaxed whitespace-pre-wrap break-words">
												{message.content}
											</p>
											<div
												className={cn(
													"flex items-center gap-1 mt-1",
													isOwn
														? "justify-end"
														: "justify-start"
												)}
											>
												<span
													className={cn(
														"text-[10px]",
														isOwn
															? "text-white/60"
															: "text-gray-400"
													)}
												>
													{formatMessageTime(
														message.createdAt
													)}
												</span>
												{isOwn && (
													message.isRead ? (
														<CheckCheck className="w-3.5 h-3.5 text-white/70" />
													) : (
														<Check className="w-3.5 h-3.5 text-white/50" />
													)
												)}
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				)}
				<div ref={messagesEndRef} />
			</div>

			{/* Message Input */}
			<form
				onSubmit={handleSendMessage}
				className="flex items-center gap-2 sm:gap-3 px-3 sm:px-6 py-3 sm:py-4 border-t border-gray-100 bg-white"
			>
				<input
					ref={inputRef}
					type="text"
					value={newMessage}
					onChange={(e) => setNewMessage(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Écrire un message..."
					className="flex-1 px-4 py-2.5 sm:py-3 bg-gray-50 border border-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green focus:bg-white transition-colors"
					disabled={isSending}
					maxLength={2000}
					autoComplete="off"
				/>
				<button
					type="submit"
					disabled={!newMessage.trim() || isSending}
					className={cn(
						"w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all shrink-0",
						newMessage.trim() && !isSending
							? "bg-brand-green text-white hover:bg-brand-green-dark active:scale-95 shadow-sm shadow-brand-green/25"
							: "bg-gray-100 text-gray-400 cursor-not-allowed"
					)}
				>
					{isSending ? (
						<Loader2 className="w-4 h-4 animate-spin" />
					) : (
						<Send className="w-4 h-4" />
					)}
				</button>
			</form>
		</div>
	);
}
