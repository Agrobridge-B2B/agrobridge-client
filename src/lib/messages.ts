import { api } from "@/lib/api";

export interface MessageParticipant {
	_id: string;
	fullName: string;
	profileImage?: string;
}

export interface Message {
	_id: string;
	conversation: string;
	sender: string | MessageParticipant;
	content: string;
	images?: string[];
	isRead: boolean;
	createdAt: string;
}

export interface Conversation {
	_id: string;
	participants: MessageParticipant[];
	lastMessage: Message | null;
	otherParticipant: MessageParticipant;
	unreadCount: number;
	createdAt: string;
	updatedAt: string;
}

interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

/**
 * Start a new conversation with a seller, or retrieve existing one.
 * Sends the initial message at the same time.
 */
export async function startConversation(
	recipientId: string,
	message: string
): Promise<{ conversation: Conversation; message: Message }> {
	const { data } = await api.post<
		ApiResponse<{ conversation: Conversation; message: Message }>
	>("/conversations", { recipientId, message });
	return data.data;
}

/**
 * Fetch all conversations for the currently authenticated user,
 * sorted by most recent activity.
 */
export async function getConversations(): Promise<Conversation[]> {
	const { data } = await api.get<
		ApiResponse<{ conversations: Conversation[] }>
	>("/conversations");
	return data.data.conversations;
}

/**
 * Fetch paginated messages for a specific conversation.
 */
export async function getMessages(
	conversationId: string,
	page = 1,
	limit = 50
): Promise<{
	messages: Message[];
	total: number;
	page: number;
	pages: number;
}> {
	const { data } = await api.get<
		ApiResponse<{
			messages: Message[];
			total: number;
			page: number;
			pages: number;
		}>
	>(`/conversations/${conversationId}/messages`, {
		params: { page, limit },
	});
	return data.data;
}

/**
 * Send a text message in an existing conversation.
 */
export async function sendMessage(
	conversationId: string,
	content: string
): Promise<Message> {
	const { data } = await api.post<ApiResponse<{ message: Message }>>(
		`/conversations/${conversationId}/messages`,
		{ content }
	);
	return data.data.message;
}

/**
 * Mark all unread messages in a conversation as read.
 */
export async function markConversationAsRead(
	conversationId: string
): Promise<void> {
	await api.patch(`/conversations/${conversationId}/read`);
}

/**
 * Get the total unread messages count across all conversations,
 * used for navigation badge display.
 */
export async function getUnreadMessagesCount(): Promise<number> {
	const { data } = await api.get<ApiResponse<{ unreadCount: number }>>(
		"/conversations/unread-count"
	);
	return data.data.unreadCount;
}
