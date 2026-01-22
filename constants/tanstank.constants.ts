// Auth

// export const _Auth = {
//     login: 'auth_login',
// }

export const MUTATION = {
    AUTH: {
        login: "auth_login",
        signup: "auth_signup",
        verifySignupOTP: "auth_verify_signup_otp",
        resendSignupOTP: "auth_resend_signup_otp",
        forgotPassword: "auth_forgot_password",
        resendForgotOTP: "auth_resend_forgot_otp",
        verifyForgotOTP: "auth_verify_forgot_otp",
        setNewPassword: "auth_set_new_password",
        changePassword: "auth_change_password",
        setPasswordForOauth: "auth_set_password_oauth",
    },
};

export const QUERY = {
    AUTH: {},
    COMPANY: {
        getMyComanyDetails: 'get_my_company_details',

    },
    COMPANY_INDUSTRY: {
        getCompanyIndustry: 'get_company_industry',
        getIndustryList: 'get_inductry_list'
    }
};
