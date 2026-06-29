import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import Button from "../../ui/Button";
import SettingsCard from "../SettingsCard";

import { useAuth } from "../../../contexts/AuthContext";
import useSettings from "../../../hooks/useSettings";

import AccountInfo from "./AccountInfo";
import ProfileStats from "./ProfileStats";

import styles from "./ProfileSection.module.css";

const ProfileSection = () => {
    const { user } = useAuth();

    const {
        settings,
        saveSettings,
    } = useSettings();

    const [displayName, setDisplayName] =
        useState("");

    const [imageError, setImageError] =
        useState(false);

    useEffect(() => {
        if (settings?.displayName) {
            setDisplayName(
                settings.displayName
            );
        } else {
            setDisplayName(
                user?.displayName ?? ""
            );
        }
    }, [settings, user]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await saveSettings({
                displayName,
            });

            toast.success(
                "Profile updated."
            );
        } catch (error) {
            console.error(error);

            toast.error(
                "Unable to update profile."
            );
        }
    };

    const initials =
        (
            displayName ||
            user?.displayName ||
            user?.email ||
            "User"
        )
            .split(" ")
            .map((word) => word[0])
            .join("")
            .substring(0, 2)
            .toUpperCase();

    return (
        <SettingsCard
            title="Profile"
            description="Manage your personal information."
        >
            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <div className={styles.profile}>
                    {user?.photoURL &&
                        !imageError ? (
                        <img
                            src={user.photoURL}
                            alt={
                                displayName ||
                                "Profile"
                            }
                            className={
                                styles.avatar
                            }
                            onError={() =>
                                setImageError(
                                    true
                                )
                            }
                        />
                    ) : (
                        <div
                            className={
                                styles.avatarFallback
                            }
                        >
                            {initials}
                        </div>
                    )}

                    <div className={styles.info}>
                        <div
                            className={
                                styles.field
                            }
                        >
                            <label>
                                Display Name
                            </label>

                            <input
                                value={
                                    displayName
                                }
                                onChange={(
                                    event
                                ) =>
                                    setDisplayName(
                                        event
                                            .target
                                            .value
                                    )
                                }
                            />
                        </div>

                        <div
                            className={
                                styles.field
                            }
                        >
                            <label>
                                Email
                            </label>

                            <input
                                value={
                                    user?.email ??
                                    ""
                                }
                                disabled
                            />
                        </div>
                    </div>
                </div>

                <div
                    className={
                        styles.actions
                    }
                >
                    <Button type="submit">
                        Save Profile
                    </Button>
                </div>

                <AccountInfo />

                <ProfileStats />
            </form>
        </SettingsCard>
    );
};

export default ProfileSection;