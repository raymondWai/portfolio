export const sections = [
    'personal_info',
    'work_experience',
    'education',
    'skills',
    'languages',
];

export interface ResumeEntryType {
    position: string;
    duration: string;
    company: string;
    description: string;
}

export const personalInfos: Array<ResumeEntryType> = [
    {
        position: 'Man Ho Wai',
        duration: 'Mr.',
        company: 'waimanho2765galois@gmail.com',
        description: '6475635796',
    },
    {
        position: 'Finch ave E',
        duration: 'North York',
        company: 'Ontario',
        description: '',
    },
];

export const workExperiences: Array<ResumeEntryType> = [
    {
        position: 'Software Engineer(Associate)',
        duration: 'May 2019 - Oct 2021',
        company: 'EGUSI',
        description:
            'Develop web/app/back-end from scratch or take over from other teams \
            Debugging Create maintaining doc',
    },
    {
        position: 'Software Engineer',
        duration: 'Oct 2020 - Apr 2020',
        company: 'MFinance',
        description:
            'Responsible for developing a full function stock trading web app with \
            real-time chart rendering, order management(create, amend, cancel, show \
                history), IPO(list, detail, apply, amend, cancel), News, account \
                management',
    },
    {
        position: 'Software Engineer',
        duration: 'Apr 2020 - Oct 2021',
        company: 'Siemens',
        description:
            'Develop and Debug a ticket management system. Migrate the auto CI/CD \
            system from local server to aws and integrated with eks, alb and s3. \
            Added multi-node capability to the system. Communicate with the client \
            to confirm some change request and provide estimation of task.',
    },
];

export const educations: Array<ResumeEntryType> = [
    {
        position: "Bachelor's Degree in Physics",
        duration: 'HKUST',
        company: 'Sep 2016 - Feb 2020',
        description:
            'Major in Physics and Minor in Cosmology while my capstone is about Machine Learning.',
    },
];

export const skills: Array<ResumeEntryType> = [
    {
        position: 'Typescript',
        duration: '3 yrs',
        company: '',
        description: '',
    },
    {
        position: 'React.js',
        duration: '3 yrs',
        company: '',
        description: '',
    },
    {
        position: 'Express',
        duration: '2 yrs',
        company: '',
        description: '',
    },
    {
        position: 'React Native',
        duration: '3 yr',
        company: '',
        description: '',
    },
    {
        position: 'AngularJs',
        duration: '1 yr',
        company: '',
        description: '',
    },
    {
        position: 'Next.js',
        duration: '1 yr',
        company: '',
        description: '',
    },
    {
        position: 'MongoDB',
        duration: '1 yr',
        company: '',
        description: '',
    },
    {
        position: 'MySQL',
        duration: '1 yrs',
        company: '',
        description: '',
    },
    {
        position: 'Laravel',
        duration: '2 yrs',
        company: '',
        description: '',
    },
    {
        position: 'Redis',
        duration: '1 yr',
        company: '',
        description: '',
    },
    {
        position: 'Aws',
        duration: '1 yr',
        company: '',
        description: '',
    },
    {
        position: 'Python',
        duration: '2 yr',
        company: '',
        description: '',
    },
];
export const languages: Array<ResumeEntryType> = [
    {
        position: 'Cantonese',
        duration: 'Native',
        company: '',
        description: '',
    },
    {
        position: 'English',
        duration: 'Intermediate',
        company: '',
        description: '',
    },
    {
        position: 'Japanese',
        duration: 'Intermediate',
        company: '',
        description: '',
    },
];
