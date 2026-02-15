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

    COMPANY: {
        createCompany: "create_company",
        updateCompany: "update_company",
    },

    COMPANY_INDUSTRY: {
        addIndustry: "add_industry",
        remove: "remove_industry",
    },

    APPLY: {
        applyJob: "apply_job",
        updateApplicationStatus: "update_application_status",
    },

    JOB: {
        createJob: "create_job",
        editJob: "edit_job",
        updateJobStatus: "updateJobStatus",
        deleteJob: "deleteJob",
        toggleSaveJob: "toggle_save_job",
    },

    JOBSKILL: {
        addSkill: "add_skill",
        removeSkill: "remove_skill",
    },

    JOB_BENEFIT: {
        addBenefit: "add_benefit",
        removeBenefit: "remove_benefit",
    },

    CANDIDATE_PROFILE: {
        createCandidateProfile: "create_candidate_profile",
        updateCandidateProfile: "update_candidate_profile",
    },

    CANDIDATE_LANGUAGE: {
        createLanguage: "create_language",
        updateLanguageLevel: "update_language_level",
        deleteLanguage: "delete_language",
    },

    CANDIDATE_SKILL: {
        createSkill: "create_skill",
        deleteSkill: "delete_skill",
    },

    CANDIDATE_EDUCATION: {
        createEducation: "create_eduction",
        editEducation: "edit_education",
        deleteEducation: "delete_education",
    },

    CANDIDATE_EXPERIENCE: {
        createExperience: "create_experience",
        editExperience: "edit_experience",
        deleteExperience: "delete_experience",
    },

    PAYMENT: {
        RAZORPAY: {
            buySubscription: "buy_subscription",
        },
    },
};

export const QUERY = {
    USER: {
        getUserData: "get_user_data",
    },

    COMPANY: {
        getMyComanyDetails: "get_my_company_details",
        getCompanyById: "get_company_by_id", // --> uses companyId as param
        getCompanyViewById: "get_company_view_by_id", // --> uses companyId as param
    },

    COMPANY_INDUSTRY: {
        getCompanyIndustry: "get_company_industry", // --> uses companyId as param
        getIndustryList: "get_inductry_list",
    },

    JOB: {
        getAllJobs: "get_all_jobs", // --> uses search params
        getJobById: "get_job_by_id", // --> uses jobId params
        getAllSavedJob: "get_all_saved_jobs", // --> uses page params
    },

    JOBSKILL: {
        getJobIdSkill: "get_job_id_skill", // --> uses jobId params
    },

    JOBBENEFIT: {
        getBenefitList: "get_benefit_list",
        getJobIdBenefit: "get_job_id_benefit", // --> uses jobId params
    },

    APPLY: {
        getAllApplication: "get_all_application", // --> uses page params
        getApplicationById: "get_application_by_id", // --> uses jobId and candidateProfileId params
    },

    CANDIDATE_PROFILE: {
        getCandidateProfile: "get_candidate_profile",
    },

    CANDIDATE_LANGUAGE: {
        getCandidateLanguage: "get_candidate_language",
    },

    CANDIDATE_SKILL: {
        getCandidateSkill: "get_candidate_skill",
    },

    CANDIDATE_EDUCATION: {
        getCandidateEducation: "get_candidate_education",
    },

    CANDIDATE_EXPERIENCE: {
        getCandidateExperience: "get_candidate_experience",
    },

    CANDIDATE_RESUME: {
        getCandidateResume: "get_candidate_resume",
    },

    PAYMENT: {
        DATA: {
            getSubscription: "get_subscription",
        },
    },
};
