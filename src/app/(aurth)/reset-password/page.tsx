import React, { Suspense } from 'react';
import ResetPasswordForm from './reset-password-form';

const ResetPasswordPage = () => {
    return (
        <div className='flex flex-col justify-center items-center mt-10'>
            <p>Enter a new password</p>

            <Suspense fallback='loading'>
                <ResetPasswordForm></ResetPasswordForm>
            </Suspense>
            
        </div>
    );
};

export default ResetPasswordPage;