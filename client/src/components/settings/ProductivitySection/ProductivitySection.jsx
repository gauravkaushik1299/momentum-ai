import { useEffect, useState } from 'react';

import toast from 'react-hot-toast';

import Button from '../../ui/Button';
import SettingsCard from '../SettingsCard';

import useSettings from '../../../hooks/useSettings';

import styles from './ProductivitySection.module.css';

const ProductivitySection = () => {
    const {
        settings,
        loading,
        saveSettings,
    } = useSettings();

    const [formData, setFormData] =
        useState({
            workStart: '',
            workEnd: '',
            dailyFocusGoal: 240,
            pomodoroLength: 25,
            shortBreak: 5,
            longBreak: 15,
        });

    useEffect(() => {
        if (!settings) {
            return;
        }

        setFormData({
            workStart: settings.workStart,
            workEnd: settings.workEnd,
            dailyFocusGoal:
                settings.dailyFocusGoal,
            pomodoroLength:
                settings.pomodoroLength,
            shortBreak:
                settings.shortBreak,
            longBreak:
                settings.longBreak,
        });
    }, [settings]);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormData((previous) => ({
            ...previous,
            [name]:
                event.target.type === 'number'
                    ? Number(value)
                    : value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await saveSettings(formData);

            toast.success(
                'Settings updated.'
            );
        } catch (error) {
            console.error(error);

            toast.error(
                'Unable to save settings.'
            );
        }
    };

    if (loading) {
        return (
            <SettingsCard
                title="Productivity"
                description="Loading..."
            />
        );
    }

    return (
        <SettingsCard
            title="Productivity"
            description="Configure your working preferences."
        >
            <form
                className={styles.form}
                onSubmit={handleSubmit}
            >
                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>
                            Work Start
                        </label>

                        <input
                            type="time"
                            name="workStart"
                            value={
                                formData.workStart
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Work End
                        </label>

                        <input
                            type="time"
                            name="workEnd"
                            value={
                                formData.workEnd
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>
                            Daily Focus Goal
                            (minutes)
                        </label>

                        <input
                            type="number"
                            min="30"
                            step="15"
                            name="dailyFocusGoal"
                            value={
                                formData.dailyFocusGoal
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Pomodoro Length
                        </label>

                        <input
                            type="number"
                            min="5"
                            step="5"
                            name="pomodoroLength"
                            value={
                                formData.pomodoroLength
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>
                </div>

                <div className={styles.grid}>
                    <div className={styles.field}>
                        <label>
                            Short Break
                        </label>

                        <input
                            type="number"
                            min="1"
                            step="1"
                            name="shortBreak"
                            value={
                                formData.shortBreak
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>

                    <div className={styles.field}>
                        <label>
                            Long Break
                        </label>

                        <input
                            type="number"
                            min="5"
                            step="5"
                            name="longBreak"
                            value={
                                formData.longBreak
                            }
                            onChange={
                                handleChange
                            }
                        />
                    </div>
                </div>

                <div
                    className={styles.actions}
                >
                    <Button type="submit">
                        Save Changes
                    </Button>
                </div>
            </form>
        </SettingsCard>
    );
};

export default ProductivitySection;