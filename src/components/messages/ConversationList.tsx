"use client";

import { useState } from "react";
import Image from "next/image";
import { Search, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { getImageUrl } from "@/lib/upload";
import type { Conversation } from "@/lib/messages";

interface ConversationListProps {
	conversations: Conversation[];
	activeConversationId: string | null;
	currentUserId: string;
	onSelect: (conversation: Conversation) => void;
}

function getInitials(name: string): string {
	return name
		.split(" ")
		.map((part) => part.charAt(0))
		.join("")
		.toUpperCase()
		.slice(0, 2);
}

function formatRelativeDate(dateString: string): string {
	const timestamp = new Date(dateString).getTime();
	if (Number.isNaN(timestamp)) return "";

	const diffMinutes = Math.max(0, Math.floor((Date.now() - timestamp) / 60000));
	if (diffMinutes < 1) return "À l'instant";
	if (diffMinutes < 60) return `${diffMinutes} min`;

	const diffHours = Math.floor(diffMinutes / 60);
	if (diffHours < 24) return `${diffHours}h`;

	const diffDays = Math.floor(diffHours / 24);
	if (diffDays === 1) return "Hier";
	if (diffDays < 7) return `Il y a ${diffDays}j`;

	return new Date(dateString).toLocaleDateString("fr-FR", {
		day: "numeric",
		month: "short",
	});
}

function getLastMessagePreview(
	conversation: Conversation,
	currentUserId: string
): string {
	if (!conversation.lastMessage) return "Nouvelle conversation";

	const senderId =
		typeof conversation.lastMessage.sender === "object"
			? conversation.lastMessage.sender._id
			: conversation.lastMessage.sender;

	const prefix = senderId === currentUserId ? "Vous: " : "";
	const content = conversation.lastMessage.content || "";

	if (content.length > 40) {
		return `${prefix}${content.slice(0, 40)}...`;
	}
	return `${prefix}${content}`;
}

export function ConversationList({
	conversations,
	activeConversationId,
	currentUserId,
	onSelect,
}: ConversationListProps) {
	const [searchQuery, setSearchQuery] = useState("");

	const filtered = conversations.filter((conv) =>
		conv.otherParticipant.fullName
			.toLowerCase()
			.includes(searchQuery.toLowerCase())
	);

	return (
		<div className="flex flex-col h-full bg-white">
			{/* Header */}
			<div className="px-4 pt-5 pb-3 border-b border-gray-100">
				<h2 className="text-xl font-bold text-gray-900 mb-4">Messages</h2>
				<div className="relative">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
					<input
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Rechercher..."
						className="w-full pl-9 pr-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-brand-green/20 focus:border-brand-green focus:bg-white transition-colors"
					/>
				</div>
			</div>

			{/* Conversation Items */}
			<div className="flex-1 overflow-y-auto">
				{filtered.length === 0 ? (
					<div className="flex flex-col items-center justify-center h-64 px-6">
						<div className="w-14 h-14 rounded-full bg-gray-50 flex items-center justify-center mb-3">
							<MessageSquare className="w-6 h-6 text-gray-300" />
						</div>
						<p className="text-sm font-medium text-gray-400">
							{searchQuery
								? "Aucun résultat trouvé"
								: "Aucune conversation"}
						</p>
						{searchQuery && (
							<p className="text-xs text-gray-300 mt-1">
								Essayez un autre terme
							</p>
						)}
					</div>
				) : (
					filtered.map((conversation) => {
						const isActive = conversation._id === activeConversationId;
						const participant = conversation.otherParticipant;
						const hasUnread = conversation.unreadCount > 0;
						const lastMessageDate =
							conversation.lastMessage?.createdAt ||
							conversation.updatedAt;

						return (
							<button
								key={conversation._id}
								type="button"
								onClick={() => onSelect(conversation)}
								className={cn(
									"w-full flex items-center gap-3 px-4 py-3.5 text-left transition-all",
									isActive
										? "bg-brand-green/5 border-l-[3px] border-l-brand-green"
										: "border-l-[3px] border-l-transparent hover:bg-gray-50/80"
								)}
							>
								{/* Avatar */}
								<div className="relative shrink-0">
									{participant.profileImage ? (
										<Image
											src={getImageUrl(participant.profileImage)}
											alt={participant.fullName}
											width={48}
											height={48}
											className="w-12 h-12 rounded-full object-cover"
											unoptimized
										/>
									) : (
										<div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-green to-brand-green-dark flex items-center justify-center text-white font-semibold text-sm">
											{getInitials(participant.fullName)}
										</div>
									)}
									<span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
								</div>

								{/* Content */}
								<div className="flex-1 min-w-0">
									<div className="flex items-center justify-between mb-0.5">
										<p
											className={cn(
												"text-sm truncate",
												hasUnread
													? "font-bold text-gray-900"
													: "font-semibold text-gray-800"
											)}
										>
											{participant.fullName}
										</p>
										<span
											className={cn(
												"text-[11px] shrink-0 ml-2",
												hasUnread
													? "text-brand-green font-semibold"
													: "text-gray-400"
											)}
										>
											{formatRelativeDate(lastMessageDate)}
										</span>
									</div>
									<div className="flex items-center justify-between">
										<p
											className={cn(
												"text-[13px] truncate",
												hasUnread
													? "text-gray-700 font-medium"
													: "text-gray-500"
											)}
										>
											{getLastMessagePreview(
												conversation,
												currentUserId
											)}
										</p>
										{hasUnread && (
											<span className="shrink-0 ml-2 min-w-5 h-5 px-1.5 bg-brand-green text-white text-[10px] font-bold rounded-full flex items-center justify-center">
												{conversation.unreadCount > 99
													? "99+"
													: conversation.unreadCount}
											</span>
										)}
									</div>
								</div>
							</button>
						);
					})
				)}
			</div>
		</div>
	);
}
