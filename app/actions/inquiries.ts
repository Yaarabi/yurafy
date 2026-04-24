'use server';

export async function submitInquiry(formData: any) {
    try {
        const res = await fetch("https://app.yurafy.com/api/services/inquiries", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData),
        });
        
        const data = await res.json();
        
        if (!res.ok) {
            return {
                success: false,
                status: res.status,
                error: data.message || data.error || 'Failed to submit',
                details: data.details
            };
        }
        
        return { success: true, data };
    } catch (err: any) {
        console.error("Error submitting inquiry:", err);
        return { 
            success: false, 
            error: err.message || "An unexpected error occurred" 
        };
    }
}
