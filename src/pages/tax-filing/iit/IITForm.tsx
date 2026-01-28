import React from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import type { IITStatus } from './IITPage';

export interface IITFormData {
    clientId: string;
    clientName: string;
    period: string;
    periodUnit: string;
    dinNo: string;
    status: IITStatus;
}

interface IITFormProps {
    onSubmit: (data: IITFormData) => void;
}

const IITForm: React.FC<IITFormProps> = ({ onSubmit }) => {
    const { register, handleSubmit, setValue, watch, reset, formState: { errors } } = useForm<IITFormData>({
        defaultValues: {
            periodUnit: 'Months',
            status: 'Pending',
        },
    });

    const selectedPeriodUnit = watch('periodUnit');
    const selectedStatus = watch('status');

    const onFormSubmit = (data: IITFormData) => {
        onSubmit(data);
        reset();
    };

    return (
        <Card className="border-none shadow-sm bg-card">
            <CardHeader className="pb-4">
                <CardTitle className="text-lg font-medium text-card-foreground">New Entry</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">

                        {/* Client Section */}
                        <div className="lg:col-span-4 space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Client Details</h3>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="clientId">Client ID</Label>
                                    <Input
                                        id="clientId"
                                        placeholder="e.g. CL-0001"
                                        {...register('clientId', { required: true })}
                                    />
                                    {errors.clientId && <span className="text-xs text-red-500">Required</span>}
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="clientName">Client Name</Label>
                                    <Input
                                        id="clientName"
                                        placeholder="e.g. John Doe"
                                        {...register('clientName', { required: true })}
                                    />
                                    {errors.clientName && <span className="text-xs text-red-500">Required</span>}
                                </div>
                            </div>
                        </div>

                        {/* Divider for large screens */}
                        <div className="hidden lg:block lg:col-span-1 border-l border-neutral-200 mx-auto h-full" />

                        {/* Tax Period Section */}
                        <div className="lg:col-span-4 space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Tax Period</h3>
                            <div className="space-y-4">
                                <div className="flex gap-2">
                                    <div className="flex-1 space-y-2">
                                        <Label htmlFor="period">Duration</Label>
                                        <Input
                                            id="period"
                                            type="number"
                                            placeholder="1"
                                            {...register('period', { required: true })}
                                        />
                                    </div>
                                    <div className="w-[140px] space-y-2">
                                        <Label htmlFor="periodUnit">Unit</Label>
                                        <Select
                                            value={selectedPeriodUnit}
                                            onValueChange={(val) => setValue('periodUnit', val)}
                                        >
                                            <SelectTrigger>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Days">Days</SelectItem>
                                                <SelectItem value="Months">Months</SelectItem>
                                                <SelectItem value="Years">Years</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="dinNo">Taxpayer ID (TIN)</Label>
                                    <Input
                                        id="dinNo"
                                        placeholder="e.g. TIN-123456"
                                        {...register('dinNo', { required: true })}
                                    />
                                    {errors.dinNo && <span className="text-xs text-red-500">Required</span>}
                                </div>
                            </div>
                        </div>

                        {/* Divider for large screens */}
                        <div className="hidden lg:block lg:col-span-1 border-l border-neutral-200 mx-auto h-full" />

                        {/* Payment Status Section */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Status</h3>
                            <RadioGroup
                                value={selectedStatus}
                                onValueChange={(val: IITStatus) => setValue('status', val)}
                                className="flex flex-col space-y-2"
                            >
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Paid" id="status-paid" className="text-status-paid-text border-status-paid-text" />
                                    <Label htmlFor="status-paid" className="font-normal text-foreground">Paid</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="Pending" id="status-pending" className="text-status-pending-text border-status-pending-text" />
                                    <Label htmlFor="status-pending" className="font-normal text-foreground">Pending</Label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <RadioGroupItem value="IRD Paid" id="status-ird" className="text-status-ird-text border-status-ird-text" />
                                    <Label htmlFor="status-ird" className="font-normal text-foreground">IRD Paid</Label>
                                </div>
                            </RadioGroup>
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => reset()}
                            className="w-24"
                        >
                            Clear
                        </Button>
                        <Button
                            type="submit"
                            className="w-24 bg-primary hover:bg-primary/90"
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};

export default IITForm;
