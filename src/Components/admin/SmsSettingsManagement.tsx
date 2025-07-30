import React from 'react'
import AdminSidebar from "../Sidebar/AdminSidebar";
import { AxiosResponse } from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminSmsApi } from '../../apis/AdminSmsApi';

function SmsSettingsManagement() {
    const [settings, setSettings] = React.useState<any>({
        cost_per_segment: 3.89,
        daily_limit_per_user: 1000,
        monthly_limit_per_user: 10000,
        minimum_wallet_balance: 100,
        auto_approve_sender_ids: false
    });
    const [loading, setLoading] = React.useState(false);
    const [saving, setSaving] = React.useState(false);

    React.useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = () => {
        setLoading(true);
        AdminSmsApi.getSmsSettings().then(
            (response: AxiosResponse<any>) => {
                if (response?.data) {
                    setSettings(response?.data);
                }
                setLoading(false);
            }
        ).catch(function (error: any) {
            console.log(error);
            setLoading(false);
        });
    };

    const handleInputChange = (field: string, value: any) => {
        setSettings((prev: any) => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSaveSettings = () => {
        setSaving(true);
        AdminSmsApi.updateSmsSettings(settings).then(
            (response: any) => {
                if (response?.data) {
                    toast.success('SMS settings updated successfully');
                } else {
                    toast.error(response?.response?.data?.message || 'Failed to update settings');
                }
                setSaving(false);
            }
        ).catch(function (error: any) {
            console.log(error.response);
            toast.error(error.response?.data?.message || 'Failed to update settings');
            setSaving(false);
        });
    };

    if (loading) {
        return (
            <div>
                <AdminSidebar />
                <div className="relative md:ml-64 bg-white">
                    <div className='py-10 lg:py-20 lg:px-10 px-6 '>
                        <div className="flex justify-center items-center h-64">
                            <div className="text-lg">Loading settings...</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <AdminSidebar />
            <ToastContainer />

            <div className="relative md:ml-64 bg-white">
                <div className='py-10 lg:py-20 lg:px-10 px-6'>
                    <h1 className='text-[30px] font-semibold mb-8'>SMS Platform Settings</h1>

                    <div className="max-w-4xl">
                        {/* Pricing Settings */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Pricing Configuration</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Cost Per SMS Segment (₦)
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.cost_per_segment}
                                        onChange={(e) => handleInputChange('cost_per_segment', parseFloat(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                        step="0.01"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Amount charged per 160-character SMS segment
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Minimum Wallet Balance (₦)
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.minimum_wallet_balance}
                                        onChange={(e) => handleInputChange('minimum_wallet_balance', parseFloat(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                        step="0.01"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Minimum balance required to send SMS
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Usage Limits */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Usage Limits</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Daily SMS Limit Per User
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.daily_limit_per_user}
                                        onChange={(e) => handleInputChange('daily_limit_per_user', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Maximum SMS messages per user per day (0 = unlimited)
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Monthly SMS Limit Per User
                                    </label>
                                    <input
                                        type="number"
                                        value={settings.monthly_limit_per_user}
                                        onChange={(e) => handleInputChange('monthly_limit_per_user', parseInt(e.target.value))}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        min="0"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Maximum SMS messages per user per month (0 = unlimited)
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Sender ID Settings */}
                        <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Sender ID Configuration</h2>

                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="auto_approve"
                                    checked={settings.auto_approve_sender_ids}
                                    onChange={(e) => handleInputChange('auto_approve_sender_ids', e.target.checked)}
                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                />
                                <label htmlFor="auto_approve" className="ml-2 text-sm font-medium text-gray-700">
                                    Auto-approve new Sender ID requests
                                </label>
                            </div>
                            <p className="text-xs text-gray-500 mt-2">
                                When enabled, new sender ID requests will be automatically approved without manual review.
                                <span className="text-red-500 font-medium"> Use with caution!</span>
                            </p>
                        </div>

                        {/* Current Statistics */}
                        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-800 mb-4">Current Platform Statistics</h2>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl font-bold text-blue-600">₦{settings.cost_per_segment}</div>
                                    <div className="text-xs text-gray-600">Per Segment</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl font-bold text-green-600">{settings.daily_limit_per_user}</div>
                                    <div className="text-xs text-gray-600">Daily Limit</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl font-bold text-purple-600">{settings.monthly_limit_per_user}</div>
                                    <div className="text-xs text-gray-600">Monthly Limit</div>
                                </div>
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="text-2xl font-bold text-orange-600">₦{settings.minimum_wallet_balance}</div>
                                    <div className="text-xs text-gray-600">Min Balance</div>
                                </div>
                            </div>
                        </div>

                        {/* Security Warning */}
                        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                            <div className="flex">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <h3 className="text-sm font-medium text-yellow-800">
                                        Important Notice
                                    </h3>
                                    <div className="mt-2 text-sm text-yellow-700">
                                        <p>
                                            Changes to these settings will affect all users on the platform immediately.
                                            Please ensure you understand the implications before saving changes.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveSettings}
                                disabled={saving}
                                className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-6 rounded-md transition-colors"
                            >
                                {saving ? 'Saving Settings...' : 'Save Settings'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SmsSettingsManagement