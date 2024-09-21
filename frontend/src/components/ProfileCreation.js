import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Select from 'react-select';

const StyledForm = styled.form`
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  background-color: #f9fafb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);

  h2 {
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
    color: #1f2937;
    text-align: center;
  }

  section {
    margin-bottom: 1rem;
    background-color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  h3 {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #374151;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 0.5rem;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  input, select, .react-select__control {
    width: 100%;
    height: 38px;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    font-size: 1rem;
    background-color: #fff;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

    &:focus {
      outline: none;
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
    }
  }

  /* Ensure the select dropdown arrow doesn't affect the text alignment */
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' fill='%234b5563' viewBox='0 0 16 16'%3E%3Cpath d='M7.247 11.14L2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 0.75rem center;
    background-size: 12px;
    padding-right: 2.5rem;
  }

  button {
    width: 100%;
    background-color: #1a237e;
    color: white;
    padding: 0.75rem 1rem;
    border-radius: 0.375rem;
    font-weight: 600;
    font-size: 1rem;
    border: none;
    cursor: pointer;
    transition: background-color 0.15s ease-in-out;

    &:hover {
      background-color: #2563eb;
    }

    &:focus {
      outline: none;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
    }
  }

  @media (max-width: 768px) {
    .grid {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledSelect = styled(Select)`
  .react-select__control {
    min-height: 38px;
    height: 38px;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    
    &:hover {
      border-color: #3b82f6;
    }
  }

  .react-select__value-container {
    padding: 0 8px;
    height: 36px; /* 38px - 2px for borders */
  }

  .react-select__input-container {
    margin: 0;
    padding: 0;
    height: 36px;
  }

  .react-select__placeholder {
    color: #9ca3af;
  }

  .react-select__single-value {
    margin: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .react-select__menu {
    margin-top: 2px;
    border: 1px solid #d1d5db;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .react-select__multi-value {
    background-color: #e5e7eb;
    border-radius: 0.25rem;
  }

  .react-select__multi-value__label {
    color: #374151;
  }

  .react-select__multi-value__remove {
    color: #4b5563;
    &:hover {
      background-color: #d1d5db;
      color: #1f2937;
    }
  }
`;

const ProfileCreationForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    nationality: null,
    ageGroup: '',
    course: '',
    academicLevel: '',
    subjectsEnrolled: [],
    studyPreference: '',
    availability: [],
    learningStyle: '',
    motivationalFactors: [],
    studyEnvironment: [],
    academicSkills: [],
    hobbies: [],
    interests: [],
    careerAspirations: '',
    communicationChannels: [],
    toolsProficiency: [],
    locationPreference: '',
    languagesSpoken: '',
    studyPartnerPreference: '',
    groupProjectExperience: '',
    willingnessToMentor: ''
  });

  const navigate = useNavigate(); // For redirecting to the profile page after submit

  useEffect(() => {
    if (formData.course === 'Bachelor\'s') {
      setFormData(prev => ({ ...prev, subjectsEnrolled: [] }));
    } else if (formData.course === 'Master\'s') {
      setFormData(prev => ({ ...prev, subjectsEnrolled: [] }));
    }
  }, [formData.course]);

  const handleChange = (e) => {
    const { name, value, type, options } = e.target;
    let updatedValue;

    if (type === 'select-multiple') {
      updatedValue = Array.from(options).filter(option => option.selected).map(option => option.value);
    } else {
      updatedValue = value;
    }

    const updatedFormData = {
      ...formData,
      [name]: updatedValue
    };
    setFormData(updatedFormData);
    localStorage.setItem('profileCreationFormData', JSON.stringify(updatedFormData));
  };

  const handleSelectChange = (selectedOption, actionMeta) => {
    const { name } = actionMeta;
    const updatedFormData = {
      ...formData,
      [name]: selectedOption
    };
    setFormData(updatedFormData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Save profile data to localStorage
    localStorage.setItem('profileCreationFormData', JSON.stringify(formData));


    // Simulate a successful signup by redirecting to login page after a delay
    setTimeout(() => {
        // If everything is valid, redirect to Profile Creation
        navigate('/profile');
      }, 1000); // Redirect after 1 second
  };

  // Define options for various fields
  const courses = ['Bachelor\'s', 'Master\'s'];
  const genders = ['Male', 'Female', 'Non-Binary', 'Prefer not to say'];
  const studyPreferences = ['Group', 'Individual'];
  const locationPreferences = ['In-person', 'Online'];
  const ageGroups = ['18-21','22-25','26-29','30+'];
  const semesters = ['Sem 1','Sem 2','Sem 3','Sem 4','Sem 5','Sem 6','Sem 7','Sem 8'];
  const subjectsBachelors = ['Mathematics', 'Physics', 'Chemistry', 'Biology', 'Computer Science', 'Economics', 'Psychology', 'Sociology', 'Literature', 'History', 'Political Science', 'Engineering Fundamentals','Geography'];
  const subjectsMasters = ['Data Science', 'Machine Learning', 'Business Administration', 'Marketing', 'Cybersecurity', 'Artificial Intelligence', 'Mechanical Engineering', 'Finance', 'Environmental Science', 'Education Leadership', 'International Relations', 'Design Future', 'International Business', 'Urban Development','Architecture'];
  
  const learningStyles = ['Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic'];
  const careerAspirations = ['Data Scientist','Project Manager','Business Analyst','Software Engineer','Supply Chain Manager'];
  const studyPartnerPreferences = ['Focused', 'Relaxed', 'Collaborative', 'Competitive'];
  const yesNoOptions = ['Yes', 'No'];

  const motivationalFactorsOptions = [
    { value: 'Deadlines', label: 'Deadlines' },
    { value: 'Collaboration', label: 'Collaboration' },
    { value: 'Personal Goals', label: 'Personal Goals' },
    { value: 'Competition', label: 'Competition' }
  ];
  
  const studyEnvironmentsOptions = [
    { value: 'Quiet Spaces', label: 'Quiet Spaces' },
    { value: 'Group Study Rooms', label: 'Group Study Rooms' },
    { value: 'Cafes', label: 'Cafes' },
    { value: 'Library', label: 'Library' }
  ];
  
  const strengthsOptions = [
    { value: 'Problem-Solving', label: 'Problem-Solving' },
    { value: 'Research', label: 'Research' },
    { value: 'Presentation', label: 'Presentation' },
    { value: 'Time Management', label: 'Time Management' },
    { value: 'Analytical Thinking', label: 'Analytical Thinking' }
  ];
  
  const hobbiesOptions = [
    { value: 'Reading', label: 'Reading' },
    { value: 'Gaming', label: 'Gaming' },
    { value: 'Hiking', label: 'Hiking' },
    { value: 'Cooking', label: 'Cooking' },
    { value: 'Painting', label: 'Painting' },
    { value: 'Music', label: 'Music' },
    { value: 'Sports', label: 'Sports' },
    { value: 'Photography', label: 'Photography' },
    { value: 'Dance', label: 'Dance' },
    { value: 'Yoga', label: 'Yoga' },
    { value: 'Cycling', label: 'Cycling' },
    { value: 'Chess', label: 'Chess' },
    { value: 'Running', label: 'Running' },
    { value: 'Robotics', label: 'Robotics' },
    { value: 'Writing', label: 'Writing' }
  ];
  
  const interestsOptions = [
    { value: 'Environmental Activism', label: 'Environmental Activism' },
    { value: 'Tech Entrepreneurship', label: 'Tech Entrepreneurship' },
    { value: 'Cultural Studies', label: 'Cultural Studies' },
    { value: 'Travel', label: 'Travel' },
    { value: 'Mental Health Advocacy', label: 'Mental Health Advocacy' },
    { value: 'Open Source Contributions', label: 'Open Source Contributions' },
    { value: 'Wildlife Conservation', label: 'Wildlife Conservation' },
    { value: 'Philosophy', label: 'Philosophy' },
    { value: 'Financial Literacy Education', label: 'Financial Literacy Education' },
    { value: 'Renewable Energy', label: 'Renewable Energy' },
    { value: 'Community Service', label: 'Community Service' },
    { value: 'Art Exhibitions', label: 'Art Exhibitions' },
    { value: 'Language Learning', label: 'Language Learning' },
    { value: 'Culinary Arts', label: 'Culinary Arts' },
    { value: 'Digital Marketing', label: 'Digital Marketing' },
    { value: 'Volunteering', label: 'Volunteering' },
    { value: 'Group Entertainment', label: 'Group Entertainment' },
    { value: 'DJ', label: 'DJ' },
    { value: 'Independent Music', label: 'Independent Music' },
    { value: 'Baking', label: 'Baking' }
  ];
  
  const communicationChannelsOptions = [
    { value: 'Email', label: 'Email' },
    { value: 'Slack', label: 'Slack' },
    { value: 'WhatsApp', label: 'WhatsApp' },
    { value: 'In-Person', label: 'In-Person' }
  ];
  
  const toolsTechnologiesOptions = [
    { value: 'Excel', label: 'Excel' },
    { value: 'Python', label: 'Python' },
    { value: 'SQL', label: 'SQL' },
    { value: 'Power Point', label: 'Power Point' },
    { value: 'Office 365', label: 'Office 365' },
    { value: 'Adobe Illustration', label: 'Adobe Illustration' },
    { value: 'Editing Tools', label: 'Editing Tools' },
    { value: 'Animation Tools', label: 'Animation Tools' }
  ];

  const availabilityOptions = [
    { value: 'Mon', label: 'Monday' },
    { value: 'Tue', label: 'Tuesday' },
    { value: 'Wed', label: 'Wednesday' },
    { value: 'Thu', label: 'Thursday' },
    { value: 'Fri', label: 'Friday' },
    { value: 'Sat', label: 'Saturday' },
    { value: 'Sun', label: 'Sunday' }
  ];

  const countries = [
    { value: 'AF', label: 'Afghanistan' },
    { value: 'AL', label: 'Albania' },
    { value: 'DZ', label: 'Algeria' },
    { value: 'AS', label: 'American Samoa' },
    { value: 'AD', label: 'Andorra' },
    { value: 'AO', label: 'Angola' },
    { value: 'AI', label: 'Anguilla' },
    { value: 'AQ', label: 'Antarctica' },
    { value: 'AG', label: 'Antigua and Barbuda' },
    { value: 'AR', label: 'Argentina' },
    { value: 'AM', label: 'Armenia' },
    { value: 'AW', label: 'Aruba' },
    { value: 'AU', label: 'Australia' },
    { value: 'AT', label: 'Austria' },
    { value: 'AZ', label: 'Azerbaijan' },
    { value: 'BS', label: 'Bahamas' },
    { value: 'BH', label: 'Bahrain' },
    { value: 'BD', label: 'Bangladesh' },
    { value: 'BB', label: 'Barbados' },
    { value: 'BY', label: 'Belarus' },
    { value: 'BE', label: 'Belgium' },
    { value: 'BZ', label: 'Belize' },
    { value: 'BJ', label: 'Benin' },
    { value: 'BM', label: 'Bermuda' },
    { value: 'BT', label: 'Bhutan' },
    { value: 'BO', label: 'Bolivia' },
    { value: 'BA', label: 'Bosnia and Herzegovina' },
    { value: 'BW', label: 'Botswana' },
    { value: 'BV', label: 'Bouvet Island' },
    { value: 'BR', label: 'Brazil' },
    { value: 'IO', label: 'British Indian Ocean Territory' },
    { value: 'BN', label: 'Brunei Darussalam' },
    { value: 'BG', label: 'Bulgaria' },
    { value: 'BF', label: 'Burkina Faso' },
    { value: 'BI', label: 'Burundi' },
    { value: 'KH', label: 'Cambodia' },
    { value: 'CM', label: 'Cameroon' },
    { value: 'CA', label: 'Canada' },
    { value: 'CV', label: 'Cape Verde' },
    { value: 'KY', label: 'Cayman Islands' },
    { value: 'CF', label: 'Central African Republic' },
    { value: 'TD', label: 'Chad' },
    { value: 'CL', label: 'Chile' },
    { value: 'CN', label: 'China' },
    { value: 'CX', label: 'Christmas Island' },
    { value: 'CC', label: 'Cocos (Keeling) Islands' },
    { value: 'CO', label: 'Colombia' },
    { value: 'KM', label: 'Comoros' },
    { value: 'CG', label: 'Congo' },
    { value: 'CD', label: 'Congo, the Democratic Republic of the' },
    { value: 'CK', label: 'Cook Islands' },
    { value: 'CR', label: 'Costa Rica' },
    { value: 'CI', label: "Cote d'Ivoire" },
    { value: 'HR', label: 'Croatia (Hrvatska)' },
    { value: 'CU', label: 'Cuba' },
    { value: 'CY', label: 'Cyprus' },
    { value: 'CZ', label: 'Czech Republic' },
    { value: 'DK', label: 'Denmark' },
    { value: 'DJ', label: 'Djibouti' },
    { value: 'DM', label: 'Dominica' },
    { value: 'DO', label: 'Dominican Republic' },
    { value: 'EC', label: 'Ecuador' },
    { value: 'EG', label: 'Egypt' },
    { value: 'SV', label: 'El Salvador' },
    { value: 'GQ', label: 'Equatorial Guinea' },
    { value: 'ER', label: 'Eritrea' },
    { value: 'EE', label: 'Estonia' },
    { value: 'ET', label: 'Ethiopia' },
    { value: 'FK', label: 'Falkland Islands (Malvinas)' },
    { value: 'FO', label: 'Faroe Islands' },
    { value: 'FJ', label: 'Fiji' },
    { value: 'FI', label: 'Finland' },
    { value: 'FR', label: 'France' },
    { value: 'GF', label: 'French Guiana' },
    { value: 'PF', label: 'French Polynesia' },
    { value: 'TF', label: 'French Southern Territories' },
    { value: 'GA', label: 'Gabon' },
    { value: 'GM', label: 'Gambia' },
    { value: 'GE', label: 'Georgia' },
    { value: 'DE', label: 'Germany' },
    { value: 'GH', label: 'Ghana' },
    { value: 'GI', label: 'Gibraltar' },
    { value: 'GR', label: 'Greece' },
    { value: 'GL', label: 'Greenland' },
    { value: 'GD', label: 'Grenada' },
    { value: 'GP', label: 'Guadeloupe' },
    { value: 'GU', label: 'Guam' },
    { value: 'GT', label: 'Guatemala' },
    { value: 'GN', label: 'Guinea' },
    { value: 'GW', label: 'Guinea-Bissau' },
    { value: 'GY', label: 'Guyana' },
    { value: 'HT', label: 'Haiti' },
    { value: 'HM', label: 'Heard and Mc Donald Islands' },
    { value: 'VA', label: 'Holy See (Vatican City State)' },
    { value: 'HN', label: 'Honduras' },
    { value: 'HK', label: 'Hong Kong' },
    { value: 'HU', label: 'Hungary' },
    { value: 'IS', label: 'Iceland' },
    { value: 'IN', label: 'India' },
    { value: 'ID', label: 'Indonesia' },
    { value: 'IR', label: 'Iran (Islamic Republic of)' },
    { value: 'IQ', label: 'Iraq' },
    { value: 'IE', label: 'Ireland' },
    { value: 'IL', label: 'Israel' },
    { value: 'IT', label: 'Italy' },
    { value: 'JM', label: 'Jamaica' },
    { value: 'JP', label: 'Japan' },
    { value: 'JO', label: 'Jordan' },
    { value: 'KZ', label: 'Kazakhstan' },
    { value: 'KE', label: 'Kenya' },
    { value: 'KI', label: 'Kiribati' },
    { value: 'KP', label: "Korea, Democratic People's Republic of" },
    { value: 'KR', label: 'Korea, Republic of' },
    { value: 'KW', label: 'Kuwait' },
    { value: 'KG', label: 'Kyrgyzstan' },
    { value: 'LA', label: "Lao People's Democratic Republic" },
    { value: 'LV', label: 'Latvia' },
    { value: 'LB', label: 'Lebanon' },
    { value: 'LS', label: 'Lesotho' },
    { value: 'LR', label: 'Liberia' },
    { value: 'LY', label: 'Libyan Arab Jamahiriya' },
    { value: 'LI', label: 'Liechtenstein' },
    { value: 'LT', label: 'Lithuania' },
    { value: 'LU', label: 'Luxembourg' },
    { value: 'MO', label: 'Macau' },
    { value: 'MK', label: 'Macedonia, The Former Yugoslav Republic of' },
    { value: 'MG', label: 'Madagascar' },
    { value: 'MW', label: 'Malawi' },
    { value: 'MY', label: 'Malaysia' },
    { value: 'MV', label: 'Maldives' },
    { value: 'ML', label: 'Mali' },
    { value: 'MT', label: 'Malta' },
    { value: 'MH', label: 'Marshall Islands' },
    { value: 'MQ', label: 'Martinique' },
    { value: 'MR', label: 'Mauritania' },
    { value: 'MU', label: 'Mauritius' },
    { value: 'YT', label: 'Mayotte' },
    { value: 'MX', label: 'Mexico' },
    { value: 'FM', label: 'Micronesia, Federated States of' },
    { value: 'MD', label: 'Moldova, Republic of' },
    { value: 'MC', label: 'Monaco' },
    { value: 'MN', label: 'Mongolia' },
    { value: 'MS', label: 'Montserrat' },
    { value: 'MA', label: 'Morocco' },
    { value: 'MZ', label: 'Mozambique' },
    { value: 'MM', label: 'Myanmar' },
    { value: 'NA', label: 'Namibia' },
    { value: 'NR', label: 'Nauru' },
    { value: 'NP', label: 'Nepal' },
    { value: 'NL', label: 'Netherlands' },
    { value: 'AN', label: 'Netherlands Antilles' },
    { value: 'NC', label: 'New Caledonia' },
    { value: 'NZ', label: 'New Zealand' },
    { value: 'NI', label: 'Nicaragua' },
    { value: 'NE', label: 'Niger' },
    { value: 'NG', label: 'Nigeria' },
    { value: 'NU', label: 'Niue' },
    { value: 'NF', label: 'Norfolk Island' },
    { value: 'MP', label: 'Northern Mariana Islands' },
    { value: 'NO', label: 'Norway' },
    { value: 'OM', label: 'Oman' },
    { value: 'PK', label: 'Pakistan' },
    { value: 'PW', label: 'Palau' },
    { value: 'PA', label: 'Panama' },
    { value: 'PG', label: 'Papua New Guinea' },
    { value: 'PY', label: 'Paraguay' },
    { value: 'PE', label: 'Peru' },
    { value: 'PH', label: 'Philippines' },
    { value: 'PN', label: 'Pitcairn' },
    { value: 'PL', label: 'Poland' },
    { value: 'PT', label: 'Portugal' },
    { value: 'PR', label: 'Puerto Rico' },
    { value: 'QA', label: 'Qatar' },
    { value: 'RE', label: 'Reunion' },
    { value: 'RO', label: 'Romania' },
    { value: 'RU', label: 'Russian Federation' },
    { value: 'RW', label: 'Rwanda' },
    { value: 'KN', label: 'Saint Kitts and Nevis' },
    { value: 'LC', label: 'Saint LUCIA' },
    { value: 'VC', label: 'Saint Vincent and the Grenadines' },
    { value: 'WS', label: 'Samoa' },
    { value: 'SM', label: 'San Marino' },
    { value: 'ST', label: 'Sao Tome and Principe' },
    { value: 'SA', label: 'Saudi Arabia' },
    { value: 'SN', label: 'Senegal' },
    { value: 'SC', label: 'Seychelles' },
    { value: 'SL', label: 'Sierra Leone' },
    { value: 'SG', label: 'Singapore' },
    { value: 'SK', label: 'Slovakia (Slovak Republic)' },
    { value: 'SI', label: 'Slovenia' },
    { value: 'SB', label: 'Solomon Islands' },
    { value: 'SO', label: 'Somalia' },
    { value: 'ZA', label: 'South Africa' },
    { value: 'GS', label: 'South Georgia and the South Sandwich Islands' },
    { value: 'ES', label: 'Spain' },
    { value: 'LK', label: 'Sri Lanka' },
    { value: 'SH', label: 'St. Helena' },
    { value: 'PM', label: 'St. Pierre and Miquelon' },
    { value: 'SD', label: 'Sudan' },
    { value: 'SR', label: 'Suriname' },
    { value: 'SJ', label: 'Svalbard and Jan Mayen Islands' },
    { value: 'SZ', label: 'Swaziland' },
    { value: 'SE', label: 'Sweden' },
    { value: 'CH', label: 'Switzerland' },
    { value: 'SY', label: 'Syrian Arab Republic' },
    { value: 'TW', label: 'Taiwan, Province of China' },
    { value: 'TJ', label: 'Tajikistan' },
    { value: 'TZ', label: 'Tanzania, United Republic of' },
    { value: 'TH', label: 'Thailand' },
    { value: 'TG', label: 'Togo' },
    { value: 'TK', label: 'Tokelau' },
    { value: 'TO', label: 'Tonga' },
    { value: 'TT', label: 'Trinidad and Tobago' },
    { value: 'TN', label: 'Tunisia' },
    { value: 'TR', label: 'Turkey' },
    { value: 'TM', label: 'Turkmenistan' },
    { value: 'TC', label: 'Turks and Caicos Islands' },
    { value: 'TV', label: 'Tuvalu' },
    { value: 'UG', label: 'Uganda' },
    { value: 'UA', label: 'Ukraine' },
    { value: 'AE', label: 'United Arab Emirates' },
    { value: 'GB', label: 'United Kingdom' },
    { value: 'US', label: 'United States' },
    { value: 'UM', label: 'United States Minor Outlying Islands' },
    { value: 'UY', label: 'Uruguay' },
    { value: 'UZ', label: 'Uzbekistan' },
    { value: 'VU', label: 'Vanuatu' },
    { value: 'VE', label: 'Venezuela' },
    { value: 'VN', label: 'Viet Nam' },
    { value: 'VG', label: 'Virgin Islands (British)' },
    { value: 'VI', label: 'Virgin Islands (U.S.)' },
    { value: 'WF', label: 'Wallis and Futuna Islands' },
    { value: 'EH', label: 'Western Sahara' },
    { value: 'YE', label: 'Yemen' },
    { value: 'ZM', label: 'Zambia' },
    { value: 'ZW', label: 'Zimbabwe' }
  ];

  const subjectsBachelorsOptions = subjectsBachelors.map(subject => ({ value: subject, label: subject }));
  const subjectsMastersOptions = subjectsMasters.map(subject => ({ value: subject, label: subject }));

  return (
    <StyledForm onSubmit={handleSubmit}>
      <h2>Profile Creation</h2>

      <section>
        <h3>Personal Information</h3>
        <div className="grid">
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            {genders.map(gender => (
              <option key={gender} value={gender}>{gender}</option>
            ))}
          </select>
          <StyledSelect
            name="nationality"
            value={formData.nationality}
            onChange={(option, action) => handleSelectChange(option, action)}
            options={countries}
            placeholder="Select Nationality"
            required
          />
          <select
            name="ageGroup"
            value={formData.ageGroup}
            onChange={handleChange}
            required
          >
            <option value="">Select Age Group</option>
            {ageGroups.map(age => (
              <option key={age} value={age}>{age}</option>
            ))}
          </select>
        </div>
      </section>

      <section>
        <h3>Academic Information</h3>
        <div className="grid">
          <select
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          >
            <option value="">Select Course</option>
            {courses.map(course => (
              <option key={course} value={course}>{course}</option>
            ))}
          </select>
          <select
            name="academicLevel"
            value={formData.academicLevel}
            onChange={handleChange}
            required
          >
            <option value="">Select Semester</option>
            {semesters.map(semester => (
              <option key={semester} value={semester}>{semester}</option>
            ))}
          </select>
          <StyledSelect
            name="subjectsEnrolled"
            value={formData.subjectsEnrolled}
            onChange={(selectedOptions, action) => handleSelectChange(selectedOptions, action)}
            options={formData.course === 'Bachelor\'s' ? subjectsBachelorsOptions : subjectsMastersOptions}
            isMulti
            placeholder="Select Subjects"
            required
          />
          <select
            name="studyPreference"
            value={formData.studyPreference}
            onChange={handleChange}
            required
          >
            <option value="">Study Preference</option>
            {studyPreferences.map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
          <StyledSelect
            name="availability"
            value={formData.availability}
            onChange={(selectedOptions, action) => handleSelectChange(selectedOptions, action)}
            options={availabilityOptions}
            isMulti
            placeholder="Select Availability"
            required
          />
        </div>
      </section>

      <section>
        <h3>Personality and Study Habits</h3>
        <div className="grid">
          <select
            name="learningStyle"
            value={formData.learningStyle}
            onChange={handleChange}
            required
          >
            <option value="">Learning Style</option>
            {learningStyles.map(style => (
              <option key={style} value={style}>{style}</option>
            ))}
          </select>
          <StyledSelect
            name="motivationalFactors"
            value={formData.motivationalFactors}
            onChange={(selectedOptions, action) => handleSelectChange(selectedOptions, action)}
            options={motivationalFactorsOptions}
            isMulti
            placeholder="Select Motivational Factors"
            required
          />
          <StyledSelect
            name="studyEnvironment"
            value={formData.studyEnvironment}
            onChange={(selectedOptions, action) => handleSelectChange(selectedOptions, action)}
            options={studyEnvironmentsOptions}
            isMulti
            placeholder="Select Study Environments"
            required
          />
          <StyledSelect
            name="academicSkills"
            value={formData.academicSkills}
            onChange={(selectedOptions, action) => handleSelectChange(selectedOptions, action)}
            options={strengthsOptions}
            isMulti
            placeholder="Select Academic Skills"
            required
          />
        </div>
      </section>

      <section>
        <h3>Interests and Hobbies</h3>
        <div className="grid">
          <StyledSelect
            name="hobbies"
            value={formData.hobbies}
            onChange={(selectedOptions, action) => handleSelectChange(selectedOptions, action)}
            options={hobbiesOptions}
            isMulti
            placeholder="Select Hobbies"
            required
          />
          <StyledSelect
            name="interests"
            value={formData.interests}
            onChange={(selectedOptions, action) => handleSelectChange(selectedOptions, action)}
            options={interestsOptions}
            isMulti
            placeholder="Select Interests"
            required
          />
          <select
            name="careerAspirations"
            value={formData.careerAspirations}
            onChange={handleChange}
            required
          >
            <option value="">Future Career Aspirations</option>
            {careerAspirations.map(career => (
              <option key={career} value={career}>{career}</option>
            ))}
          </select>
        </div>
      </section>

      <section>
        <h3>Technical/Work Preferences</h3>
        <div className="grid">
          <StyledSelect
            name="communicationChannels"
            value={formData.communicationChannels}
            onChange={(selectedOptions, action) => handleSelectChange(selectedOptions, action)}
            options={communicationChannelsOptions}
            isMulti
            placeholder="Select Communication Channels"
            required
          />
          <StyledSelect
            name="toolsProficiency"
            value={formData.toolsProficiency}
            onChange={(selectedOptions, action) => handleSelectChange(selectedOptions, action)}
            options={toolsTechnologiesOptions}
            isMulti
            placeholder="Select Tools & Technologies"
            required
          />
          <select
            name="locationPreference"
            value={formData.locationPreference}
            onChange={handleChange}
            required
          >
            <option value="">Location Preference</option>
            {locationPreferences.map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
          <input
            type="text"
            name="languagesSpoken"
            value={formData.languagesSpoken}
            onChange={handleChange}
            placeholder="Languages Spoken"
            required
          />
        </div>
      </section>

      <section>
        <h3>Social and Team Preferences</h3>
        <div className="grid">
          <select
            name="studyPartnerPreference"
            value={formData.studyPartnerPreference}
            onChange={handleChange}
            required
          >
            <option value="">Preferred Study Partner Personality</option>
            {studyPartnerPreferences.map(pref => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
          <select
            name="groupProjectExperience"
            value={formData.groupProjectExperience}
            onChange={handleChange}
            required
          >
            <option value="">Past Group Project Experience</option>
            {yesNoOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          <select
            name="willingnessToMentor"
            value={formData.willingnessToMentor}
            onChange={handleChange}
            required
          >
            <option value="">Willingness to Mentor Others</option>
            {yesNoOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </section>

      <button type="submit">Create Profile</button>
    </StyledForm>
  );
};

export default ProfileCreationForm;