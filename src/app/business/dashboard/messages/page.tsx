"use client";

import { useState, useRef, useEffect } from "react";
import { Search, Send, ArrowLeft, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import DashboardShell from "@/components/business/dashboard/DashboardShell";

interface Message {
  id: string;
  sender: "customer" | "seller";
  text: string;
  timestamp: string;
}

interface Conversation {
  id: string;
  customerName: string;
  customerInitials: string;
  orderRef: string;
  orderId: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  messages: Message[];
}

const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: "conv_1",
    customerName: "Emily Cartwright",
    customerInitials: "EC",
    orderRef: "Re: Order #4821",
    orderId: "4821",
    lastMessage: "Hi! Is it possible to swap the vanilla sponge for chocolate?",
    timestamp: "10:42 AM",
    unreadCount: 3,
    messages: [
      {
        id: "m1",
        sender: "customer",
        text: "Hi! I just placed order #4821 and was wondering if it's too late to make a change?",
        timestamp: "10:30 AM",
      },
      {
        id: "m2",
        sender: "seller",
        text: "Hello Emily! Not at all, we haven't started baking yet. What would you like to change?",
        timestamp: "10:35 AM",
      },
      {
        id: "m3",
        sender: "customer",
        text: "Is it possible to swap the vanilla sponge for chocolate?",
        timestamp: "10:42 AM",
      },
    ],
  },
  {
    id: "conv_2",
    customerName: "Marcus Okafor",
    customerInitials: "MO",
    orderRef: "Re: Order #4789",
    orderId: "4789",
    lastMessage: "The macarons were absolutely divine, thank you!",
    timestamp: "Yesterday",
    unreadCount: 1,
    messages: [
      {
        id: "m4",
        sender: "customer",
        text: "Just received my order #4789 — the macarons were absolutely divine, thank you!",
        timestamp: "Yesterday 3:15 PM",
      },
      {
        id: "m5",
        sender: "seller",
        text: "Thank you so much Marcus! So glad you enjoyed them. We'll be adding a salted caramel flavour next week if you're interested!",
        timestamp: "Yesterday 4:00 PM",
      },
    ],
  },
  {
    id: "conv_3",
    customerName: "Sophie Beaumont",
    customerInitials: "SB",
    orderRef: "Re: Order #4756",
    orderId: "4756",
    lastMessage: "Could you confirm the delivery time for Friday?",
    timestamp: "Mon",
    unreadCount: 0,
    messages: [
      {
        id: "m6",
        sender: "customer",
        text: "Hi, could you confirm the delivery time for my order on Friday? I have a party starting at 3pm.",
        timestamp: "Mon 9:10 AM",
      },
      {
        id: "m7",
        sender: "seller",
        text: "Hi Sophie! Your order is scheduled for delivery between 12pm and 2pm on Friday, so you'll be all set!",
        timestamp: "Mon 9:30 AM",
      },
      {
        id: "m8",
        sender: "customer",
        text: "Perfect, thank you!",
        timestamp: "Mon 9:32 AM",
      },
    ],
  },
  {
    id: "conv_4",
    customerName: "James Thornton",
    customerInitials: "JT",
    orderRef: "Re: Order #4712",
    orderId: "4712",
    lastMessage: "Do you offer gluten-free options for the brownies?",
    timestamp: "Sun",
    unreadCount: 0,
    messages: [
      {
        id: "m9",
        sender: "customer",
        text: "Hello! I saw your brownies on the site and they look amazing. Do you offer gluten-free options?",
        timestamp: "Sun 2:00 PM",
      },
      {
        id: "m10",
        sender: "seller",
        text: "Hi James! Yes, we do offer gluten-free brownies made with almond flour. They're baked in a dedicated GF environment too. Would you like to place an order?",
        timestamp: "Sun 2:45 PM",
      },
    ],
  },
];

function ConversationItem({
  conv,
  selected,
  onClick,
}: {
  conv: Conversation;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3.5 flex items-start gap-3 border-b border-gray-100 transition-colors hover:bg-amber-50 ${
        selected ? "bg-amber-50 border-l-2 border-l-amber-500" : ""
      }`}
    >
      {/* Avatar */}
      <div className="shrink-0 w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-semibold">
        {conv.customerInitials}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1">
          <span className="font-semibold text-sm text-gray-900 truncate">
            {conv.customerName}
          </span>
          <span className="text-xs text-muted-foreground shrink-0">
            {conv.timestamp}
          </span>
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {conv.orderRef}
        </p>
        <div className="flex items-center justify-between gap-2 mt-1">
          <p className="text-xs text-gray-600 truncate">{conv.lastMessage}</p>
          {conv.unreadCount > 0 && (
            <Badge className="bg-blue-500 hover:bg-blue-500 text-white text-xs px-1.5 py-0 h-4 shrink-0">
              {conv.unreadCount}
            </Badge>
          )}
        </div>
      </div>
    </button>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isSeller = msg.sender === "seller";
  return (
    <div className={`flex ${isSeller ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%] space-y-1">
        <div
          className={`rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
            isSeller
              ? "bg-amber-500 text-white rounded-br-sm"
              : "bg-gray-100 text-gray-900 rounded-bl-sm"
          }`}
        >
          {msg.text}
        </div>
        <p
          className={`text-xs text-muted-foreground ${
            isSeller ? "text-right" : "text-left"
          }`}
        >
          {msg.timestamp}
        </p>
      </div>
    </div>
  );
}

export default function MessagesPage() {
  const [conversations, setConversations] =
    useState<Conversation[]>(MOCK_CONVERSATIONS);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [showThread, setShowThread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const filtered = conversations.filter(
    (c) =>
      c.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.orderRef.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selected = conversations.find((c) => c.id === selectedId) ?? null;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected?.messages.length]);

  function selectConversation(id: string) {
    setSelectedId(id);
    setShowThread(true);
    // Mark as read
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, unreadCount: 0 } : c))
    );
  }

  function sendMessage() {
    const text = newMessage.trim();
    if (!text || !selectedId) return;
    const msg: Message = {
      id: `m_${Date.now()}`,
      sender: "seller",
      text,
      timestamp: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setConversations((prev) =>
      prev.map((c) =>
        c.id === selectedId
          ? { ...c, messages: [...c.messages, msg], lastMessage: text }
          : c
      )
    );
    setNewMessage("");
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  }

  return (
    <DashboardShell title="Messages">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden flex h-[calc(100vh-160px)] min-h-[500px]">
        {/* Left panel — conversation list */}
        <div
          className={`flex flex-col border-r border-gray-200 ${
            showThread ? "hidden md:flex" : "flex"
          } w-full md:w-1/3`}
        >
          {/* Search */}
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                className="pl-9 text-sm"
                placeholder="Search conversations…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto">
            {filtered.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-10">
                No conversations found.
              </p>
            ) : (
              filtered.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  selected={conv.id === selectedId}
                  onClick={() => selectConversation(conv.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* Right panel — thread */}
        <div
          className={`flex-col flex-1 ${
            showThread ? "flex" : "hidden md:flex"
          }`}
        >
          {!selected ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
                <Search className="h-7 w-7 text-muted-foreground" />
              </div>
              <h3 className="font-semibold text-gray-700 mb-1">
                Select a conversation
              </h3>
              <p className="text-sm text-muted-foreground">
                Select a conversation to start messaging
              </p>
            </div>
          ) : (
            <>
              {/* Thread header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden h-8 w-8"
                  onClick={() => setShowThread(false)}
                  aria-label="Back to conversations"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>

                <div className="w-9 h-9 rounded-full bg-amber-500 text-white flex items-center justify-center text-sm font-semibold shrink-0">
                  {selected.customerInitials}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-gray-900">
                    {selected.customerName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {selected.orderRef}
                  </p>
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs gap-1.5 shrink-0"
                  asChild
                >
                  <a href={`/business/dashboard/orders`}>
                    <ExternalLink className="h-3 w-3" />
                    View order
                  </a>
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
                {selected.messages.map((msg) => (
                  <MessageBubble key={msg.id} msg={msg} />
                ))}
                <div ref={messagesEndRef} />
              </div>

              {/* Input area */}
              <div className="border-t border-gray-100 p-3 flex items-end gap-2">
                <Textarea
                  className="flex-1 min-h-[40px] max-h-32 resize-none text-sm"
                  placeholder="Type a message… (Enter to send)"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={1}
                />
                <Button
                  size="icon"
                  className="bg-amber-600 hover:bg-amber-700 text-white h-10 w-10 shrink-0"
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
