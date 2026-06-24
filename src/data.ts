import { Counselor, TimeSlot } from './types';

export const COUNSELORS: Counselor[] = [
  {
    id: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    specialty: 'Career Transition & Skill Development',
    description: 'Helping students navigate the complexities of college applications and finding their passion in engineering and technology fields.',
    experience: '10+ Years Experience',
    languages: ['English', 'Spanish'],
    quote: 'I help teenagers find clarity and confidence in their future paths through empathetic listening and practical tools.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDYjw9CSRjnHRrWptx_jTBYnlOk9JhZoyJIJE3XF_oVOtjE0Vfddr7RadRPh2ed37RoLSi431qvmbbYdxwXzRjVDLYziAowpD2J-OaesylIYUvtel5Och0vbTVEQFdO1BDqL9u8ITOoFtDPE3njqtm-4LHxToZ_pEWAm2X9mGbnmacDSZEe2DtZl2sWKjS2XdKLcS6SOoimkLg2sP-Hiioz7sYq8mF_v7x3Ci52NKK8K-Si6CG0_RAtr2fJIEMqN7d1zctTxgjrtHay',
    tags: ['STEM Careers', 'University Prep']
  },
  {
    id: 'david-chen',
    name: 'David Chen',
    specialty: 'Humanities & Creative Careers',
    description: 'Specializing in helping students bridge the gap between creative hobbies and sustainable career paths in the arts and social sciences.',
    experience: '8 Years Experience',
    languages: ['English', 'Mandarin'],
    quote: 'I empower students to merge their passions with functional career options in an open, welcoming environment.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDG2Z2-sJSRKcOnUsCTtInAIwfyruhqUOKiDlyS9kpIK9wjGHiz4VF6Cv4pTbVAZh6m6mSru7v_veg3HdxnuqhPPvgRdpDtmYWV3yQnbH7ZF3AQC5ULqVTnA4n_meRYEOn0-y1wkgcZfJjBd7DuEkyfgKOzVZ-saAaPfoLe-MNbwsrFzl-Xhn4MRte_H5oWODyl8wK2PL0wrCeByyktQCIFyqXI84lAiwK2itHc15myOb23oGvn9tkUSQJRLczJLkkM5zYE53Y2M303',
    tags: ['Humanities', 'Creative Arts']
  },
  {
    id: 'maya-patel',
    name: 'Maya Patel',
    specialty: 'Medical Pathways & Study Prep',
    description: 'Passionate about guiding future medical professionals through the rigors of pre-med requirements and mental resilience.',
    experience: '12 Years Experience',
    languages: ['English', 'Hindi'],
    quote: 'My focus is providing guidance on healthcare careers while strengthening mental resilience and focus.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBX2yIx7jNBTBUqsi4qOswIgIYCEonqSw61Gx-vjZqeWi2w88W0XbSlU9CdKi7g6ieGT2XNclatruYQi71Xb-MPw05GRhkN1pkjJma-ZVkRrxruJZBVLU0bDjH4vLZ0ONTL68izukbO1ebZNTmwbh693TNiroXF58Wvxus1xO7MaGp4NbqHMdrAR55CSBtNeLDEELGbgp1nOjxRcaqVGf824rQ5g9fUu_bkGY6y-u7oOdm7qjdaz9dHblyXu5dAGSe1DmYSVbGIGfID',
    tags: ['Medical', 'Study Abroad']
  },
  {
    id: 'marcus-thorne',
    name: 'Marcus Thorne',
    specialty: 'Tech, Coding & Bootcamps',
    description: 'Expert in the modern tech landscape. I help students decide between traditional degrees and skill-focused bootcamps for web dev.',
    experience: '6 Years Experience',
    languages: ['English'],
    quote: 'Technology is about learning by doing. I help demystify the tech industry and plot your coding journey.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBrrtopLeqttSGBySKxqJgrQLAsE_F8CAK1_BwrGIad36yWgE_uG9UDPq4jChJDByp2fakbd4XHLk-11Tb0ne5agCwPtamB511Xpz9GX41RVNCnIHl-NoubBCAFpM2Zs8CqzL4xJ8wYyJzZt-sxDgepsL1RaiRFZ5Tbddy4KX3pde0pjRWx9tFVRWZ2F-rAjOIqH4nPHtS7irVOPN_2i0zE59irIBRQs1sBj0B_u7nD0flZTTIqQhF7-i3parmh9WQk3PYD6cAqYVbi',
    tags: ['STEM Careers', 'Bootcamps']
  },
  {
    id: 'jordan-rivera',
    name: 'Jordan Rivera',
    specialty: 'Senior Education & Career Specialist',
    description: 'Helping students find their voice and plan their paths with structured, supportive and confidential counseling.',
    experience: '15 Years Experience',
    languages: ['English', 'Spanish', 'French'],
    quote: 'Your session is a safe space to explore your future. No pressure, just conversation.',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOWR_VXPqSGl42cN9F9vrPo-AWOMzL2IMjT7C_Igmxb3yKWul3XJ9wi7XGHwqkjcv6_QZ50jF5SJnCgtuPlyQt77flmxOF10e5ZwuurLBtG7wvzww2G8J-btTbjBzeoJxUfqblJ7SugAJxJCiPUiRUPBBpcw0C-GWluYAcO8SFOK_e9eYbn3eh8vEZMMQx2J1GXlBTr7WfvLWRNectoWosCLMgkfLkCrdcd258023AiGf7l848bN23B67HohBkdDBuER2bNqBuoMcY',
    tags: ['University Prep', 'Study Abroad']
  }
];

export const TIME_SLOTS: TimeSlot[] = [
  { id: 'm1', label: '09:00 AM', category: 'morning' },
  { id: 'm2', label: '10:30 AM', category: 'morning' },
  { id: 'm3', label: '11:15 AM', category: 'morning' },
  { id: 'm4', label: '11:45 AM', category: 'morning', disabled: true },
  { id: 'a1', label: '02:00 PM', category: 'afternoon' },
  { id: 'a2', label: '03:30 PM', category: 'afternoon' },
  { id: 'a3', label: '04:45 PM', category: 'afternoon' },
  { id: 'a4', label: '05:15 PM', category: 'afternoon' },
  { id: 'e1', label: '07:00 PM', category: 'evening' },
  { id: 'e2', label: '08:30 PM', category: 'evening' }
];
