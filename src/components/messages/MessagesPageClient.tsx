"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useSearchParams } from "next/navigation";
import { MessageSquare, Loader2 } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ConversationList } from "./ConversationList";
import { ChatWindow } from "./ChatWindow";
import { getConversations } from "@/lib/messages";
import type { Conversation } from "@/lib/messages";

/** Interval (ms) for background conversation-list refresh */
const CONVERSATION_POLL_INTERVAL = 10_000;

export function MessagesPageClient() {
	const { user } = useAuth();
	const searchParams = useSearchParams();
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [activeConversation, setActiveConversation] =
		useState<Conversation | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	// On mobile, controls whether we show the conversation list or the chat window
	const [showChat, setShowChat] = useState(false);

	// Keep a ref so polling callbacks always see the latest active id
	const activeIdRef = useRef<string | null>(null);
	useEffect(() => {
		activeIdRef.current = activeConversation?._id ?? null;
	}, [activeConversation]);

	const targetConversationId = searchParams.get("conversationId");

	const loadConversations = useCallback(async () => {
		try {
			const data = await getConversations();
			setConversations(data);
			return data;
		} catch {
			return [];
		}
	}, []);

	// ── Initial load of conversations ──
	// When a `conversationId` query-param is present (e.g. from "Contact Seller"),
	// auto-open that conversation. Otherwise, show the conversation list only and
	// let the user pick who to talk to.
	useEffect(() => {
		let isMounted = true;

		async function init() {
			setIsLoading(true);
			const data = await loadConversations();

			if (!isMounted) return;

			if (targetConversationId) {
				const target = data.find((c) => c._id === targetConversationId);
				if (target) {
					setActiveConversation(target);
					setShowChat(true);
				}
			}
			// No auto-select — the user picks a conversation from the list.

			setIsLoading(false);
		}

		init();

		return () => {
			isMounted = false;
		};
	}, [targetConversationId, loadConversations]);

	// ── Background polling for the conversation list (sidebar) ──
	// Keeps last-message previews, unread counts, and ordering up-to-date
	// without requiring a manual refresh.
	useEffect(() => {
		const interval = setInterval(async () => {
			try {
				const data = await getConversations();
				setConversations(data);

				// Keep the active conversation object in sync with the
				// latest server data (e.g. updated unreadCount / lastMessage)
				const currentId = activeIdRef.current;
				if (currentId) {
					const updated = data.find((c) => c._id === currentId);
					if (updated) setActiveConversation(updated);
				}
			} catch {
				// Silently ignore — the list stays as-is until the next poll
			}
		}, CONVERSATION_POLL_INTERVAL);

		return () => clearInterval(interval);
	}, []);

	function handleSelectConversation(conversation: Conversation) {
		setActiveConversation(conversation);
		setShowChat(true);
	}

	// Navigate back to conversation list on mobile
	function handleBackToList() {
		setShowChat(false);
	}

	// Lightweight callback: just trigger a conversation-list refresh
	// so the sidebar reflects the new last-message preview.
	// No need to refetch all messages — ChatWindow handles that internally.
	function handleMessageSent() {
		loadConversations();
	}

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-[calc(100vh-8rem)]">
				<div className="text-center">
					<Loader2 className="w-8 h-8 animate-spin text-brand-green mx-auto mb-3" />
					<p className="text-sm text-gray-500">
						Chargement des conversations...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-[calc(100vh-8rem)] bg-white rounded-xl sm:rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
			{/* ──────────────────────────────────────────────────
			    Conversation List — Left Panel
			    On mobile: shown when showChat is false
			    On desktop (lg+): always shown
			──────────────────────────────────────────────────── */}
			<div
				className={`
					w-full lg:w-[360px] xl:w-[400px] shrink-0 border-r border-gray-100
					${showChat ? "hidden lg:flex" : "flex"}
					flex-col
				`}
			>
				<ConversationList
					conversations={conversations}
					activeConversationId={activeConversation?._id ?? null}
					currentUserId={user?.id ?? ""}
					onSelect={handleSelectConversation}
				/>
			</div>

			{/* ──────────────────────────────────────────────────
			    Chat Window — Right Panel
			    On mobile: shown when showChat is true
			    On desktop (lg+): always shown
			──────────────────────────────────────────────────── */}
			<div
				className={`
					flex-1 min-w-0
					${showChat ? "flex" : "hidden lg:flex"}
					flex-col
				`}
			>
				{activeConversation ? (
					<ChatWindow
						conversation={activeConversation}
						currentUserId={user?.id ?? ""}
						onMessageSent={handleMessageSent}
						onBack={handleBackToList}
					/>
				) : (
					<div className="flex items-center justify-center h-full bg-gray-50/30">
						<div className="text-center px-6">
							<div className="w-20 h-20 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-5">
								<MessageSquare className="w-9 h-9 text-gray-300" />
							</div>
							<p className="text-gray-600 font-semibold text-base">
								Sélectionnez une conversation
							</p>
							<p className="text-sm text-gray-400 mt-2 max-w-xs mx-auto">
								Choisissez un contact dans la liste pour commencer
								à discuter
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
