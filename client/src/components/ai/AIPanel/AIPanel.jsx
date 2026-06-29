import { useEffect, useRef, useState } from "react";

import {
    Bot,
    Send,
    Sparkles,
    X,
} from "lucide-react";

import { useAuth } from "../../../contexts/AuthContext";

import useAnalytics from "../../../hooks/useAnalytics";

import {
    analyzeProductivity,
    askMomentumAI,
} from "../../../services/aiService";

import { getGreeting } from "../../../utils/getGreeting";

import { useAI } from "../AIProvider";

import styles from "./AIPanel.module.css";

const AIPanel = () => {
    const {
        isOpen,
        closePanel,
        response,
        setResponse,
    } = useAI();

    const analytics = useAnalytics();

    const { user } = useAuth();

    const firstName =
        user?.displayName?.split(" ")[0] ??
        "there";

    const [question, setQuestion] =
        useState("");

    const [messages, setMessages] =
        useState([]);

    const [analysisLoading, setAnalysisLoading] =
        useState(false);

    const [chatLoading, setChatLoading] =
        useState(false);

    const chatEndRef = useRef(null);

    /*
    ====================================
    Scroll chat
    ====================================
    */

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    /*
    ====================================
    Analyze when panel opens
    ====================================
    */

    useEffect(() => {
        if (!isOpen) {
            return;
        }

        const runAnalysis = async () => {
            try {
                setAnalysisLoading(true);

                const result =
                    await analyzeProductivity(
                        analytics
                    );

                setResponse(result);
            } catch (error) {
                console.error(error);
            } finally {
                setAnalysisLoading(false);
            }
        };

        runAnalysis();
    }, [isOpen]);

    /*
    ====================================
    Ask AI
    ====================================
    */

    const handleAskAI = async () => {
        if (!question.trim()) {
            return;
        }

        const currentQuestion =
            question.trim();

        setQuestion("");

        setMessages((previous) => [
            ...previous,
            {
                role: "user",
                content:
                    currentQuestion,
            },
        ]);

        try {
            setChatLoading(true);

            const reply =
                await askMomentumAI(
                    analytics,
                    currentQuestion
                );

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content: reply,
                },
            ]);
        } catch (error) {
            console.error(error);

            setMessages((previous) => [
                ...previous,
                {
                    role: "assistant",
                    content:
                        "Sorry, something went wrong while contacting Gemini.",
                },
            ]);
        } finally {
            setChatLoading(false);
        }
    };

    return (
        <aside
            className={`${styles.panel} ${isOpen
                ? styles.open
                : ""
                }`}
        >
            <header className={styles.header}>
                <div>
                    <Bot size={24} />

                    <h2>
                        Momentum AI
                    </h2>
                </div>

                <button
                    onClick={
                        closePanel
                    }
                >
                    <X size={20} />
                </button>
            </header>

            <div className={styles.content}>
                <h3>
                    {getGreeting()},{" "}
                    {firstName} 👋
                </h3>

                <p>
                    I've analyzed your
                    tasks, goals and
                    productivity.
                    Here's what I
                    recommend you focus
                    on today.
                </p>

                {analysisLoading ? (
                    <div
                        className={
                            styles.loading
                        }
                    >
                        <Sparkles
                            size={42}
                        />

                        <p>
                            Momentum AI
                            is analyzing
                            your
                            productivity...
                        </p>
                    </div>
                ) : (
                    response && (
                        <>
                            <div
                                className={
                                    styles.card
                                }
                            >
                                <h4>
                                    📊 Summary
                                </h4>

                                <p>
                                    {
                                        response.summary
                                    }
                                </p>
                            </div>

                            <div
                                className={
                                    styles.card
                                }
                            >
                                <h4>
                                    🎯 Highest
                                    Priority
                                </h4>

                                <strong>
                                    {
                                        response.highestPriorityTask
                                    }
                                </strong>

                                <p>
                                    {
                                        response.reason
                                    }
                                </p>
                            </div>

                            <div
                                className={
                                    styles.card
                                }
                            >
                                <h4>
                                    📅 Suggested
                                    Plan
                                </h4>

                                <ul>
                                    {response.schedule?.map(
                                        (
                                            item,
                                            index
                                        ) => (
                                            <li
                                                key={
                                                    index
                                                }
                                            >
                                                {
                                                    item
                                                }
                                            </li>
                                        )
                                    )}
                                </ul>
                            </div>

                            <div
                                className={
                                    styles.card
                                }
                            >
                                <h4>
                                    🔥
                                    Motivation
                                </h4>

                                <p>
                                    {
                                        response.motivation
                                    }
                                </p>
                            </div>
                        </>
                    )
                )}

                <div
                    className={
                        styles.chat
                    }
                >
                    <h4>
                        Ask Momentum AI
                    </h4>

                    {messages.length >
                        0 && (
                            <div
                                className={
                                    styles.chatConversation
                                }
                            >
                                {messages.map(
                                    (
                                        message,
                                        index
                                    ) => (
                                        <div
                                            key={
                                                index
                                            }
                                            className={
                                                message.role ===
                                                    "user"
                                                    ? styles.userBubble
                                                    : styles.aiBubble
                                            }
                                        >
                                            {
                                                message.content
                                            }
                                        </div>
                                    )
                                )}

                                <div
                                    ref={
                                        chatEndRef
                                    }
                                />
                            </div>
                        )}

                    <textarea
                        rows={3}
                        placeholder="How can I improve my productivity today?"
                        value={
                            question
                        }
                        onChange={(
                            e
                        ) =>
                            setQuestion(
                                e.target
                                    .value
                            )
                        }
                    />

                    <button
                        onClick={
                            handleAskAI
                        }
                        disabled={
                            chatLoading
                        }
                    >
                        {chatLoading ? (
                            <>
                                <Sparkles
                                    size={
                                        18
                                    }
                                />
                                Thinking...
                            </>
                        ) : (
                            <>
                                <Send
                                    size={
                                        18
                                    }
                                />
                                Ask
                            </>
                        )}
                    </button>
                </div>
            </div>
        </aside>
    );
};

export default AIPanel;