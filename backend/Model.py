from flask import Flask, jsonify, request
import pandas as pd
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import LabelEncoder
from flask_cors import CORS

app = Flask(__name__)
CORS(app, supports_credentials=True)

# Custom Label Encoder to handle unseen categories
class CustomLabelEncoder(LabelEncoder):
    def transform(self, y):
        try:
            return super().transform(y)
        except ValueError:
            return np.array([-1] * len(y))

# Load the dataset
file_path = './Sdata.csv'
data = pd.read_csv(file_path)

# Select relevant features for recommendation
features = ['Study Preference', 'Learning Style', 'Subjects Enrolled', 'Hobbies', 'Proficiency in Tools/Technologies',
            'Preferred Study Partner Personality', 'Interests Outside of Academics', 'Preferred Communication Channels',
            'Nationality', 'Location Preference', 'Willingness to Mentor Others', 'Gender', 'Age Group',
            'Motivational Factors', 'Future Career Aspirations', 'Past Group Project Experience']

# Encode categorical data to numerical
label_encoders = {}
for feature in features:
    le = CustomLabelEncoder()
    data[feature] = le.fit_transform(data[feature])
    label_encoders[feature] = le

# Helper function to extract nested values from new JSON structure
def extract_values_from_profile(profile_data):
    processed_data = {}
    
    # Handle simple fields
    processed_data['Study Preference'] = profile_data['studyPreference']
    processed_data['Preferred Study Partner Personality'] = profile_data['studyPartnerPreference']
    processed_data['Learning Style'] = profile_data['learningStyle']
    processed_data['Gender'] = profile_data['gender']
    processed_data['Age Group'] = profile_data['ageGroup']
    processed_data['Location Preference'] = profile_data['locationPreference']
    processed_data['Willingness to Mentor Others'] = profile_data['willingnessToMentor']
    processed_data['Future Career Aspirations'] = profile_data['careerAspirations']
    processed_data['Past Group Project Experience'] = profile_data['groupProjectExperience']
    processed_data['Languages Spoken'] = profile_data['languagesSpoken']
    processed_data['Nationality'] = profile_data['nationality']['label']  # Extracting the label from nested dict
    
    # Handle list fields (e.g., Subjects Enrolled, Availability, etc.)
    processed_data['Subjects Enrolled'] = ', '.join([item['label'] for item in profile_data['subjectsEnrolled']])
    processed_data['Availability'] = ', '.join([item['label'] for item in profile_data['availability']])
    processed_data['Motivational Factors'] = ', '.join([item['label'] for item in profile_data['motivationalFactors']])
    processed_data['Study Environment'] = ', '.join([item['label'] for item in profile_data['studyEnvironment']])
    processed_data['Academic Skills'] = ', '.join([item['label'] for item in profile_data['academicSkills']])
    processed_data['Hobbies'] = ', '.join([item['label'] for item in profile_data['hobbies']])
    processed_data['Interests Outside of Academics'] = ', '.join([item['label'] for item in profile_data['interests']])
    processed_data['Preferred Communication Channels'] = ', '.join([item['label'] for item in profile_data['communicationChannels']])
    processed_data['Proficiency in Tools/Technologies'] = ', '.join([item['label'] for item in profile_data['toolsProficiency']])
    
    return processed_data

# Function to recommend similar students
def recommend_similar_students(new_student_data, top_n=10):
    new_student_df = pd.DataFrame([new_student_data])
    
    # Encode the new student's data
    for feature in features:
        new_student_df[feature] = label_encoders[feature].transform(new_student_df[feature])
    
    # Compute cosine similarity
    new_student_similarity = cosine_similarity(new_student_df[features], data[features])[0]
    similar_students_idx = new_student_similarity.argsort()[-top_n:][::-1]
    
    # Return a list of similar students' names
    return data.iloc[similar_students_idx]['Full Name'].tolist()

# Define an API route for fetching recommendations using the user's data
@app.route('/api/studybuddy', methods=['POST'])
def studybuddy():
    # Fetch user profile data from the request body
    user_profile = request.json  # The user profile sent from the frontend
    print("Received user profile:", user_profile)

    # Extract and process the necessary values from the profile
    processed_profile = extract_values_from_profile(user_profile)

    # Use this data to find similar students
    recommended_students = recommend_similar_students(processed_profile)
    
    return jsonify(recommended_students)

if __name__ == '__main__':
    app.run(port=5000)
