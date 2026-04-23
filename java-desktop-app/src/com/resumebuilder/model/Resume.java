package com.resumebuilder.model;

import java.util.ArrayList;
import java.util.List;

public class Resume {
    private PersonalDetails personalDetails;
    private List<Education> educationList;
    private List<Experience> experienceList;
    private List<Skill> skillList;
    private List<Project> projectList;

    public Resume() {
        this.educationList = new ArrayList<>();
        this.experienceList = new ArrayList<>();
        this.skillList = new ArrayList<>();
        this.projectList = new ArrayList<>();
    }

    // Getters and Setters
    public PersonalDetails getPersonalDetails() { return personalDetails; }
    public void setPersonalDetails(PersonalDetails personalDetails) { this.personalDetails = personalDetails; }
    public List<Education> getEducationList() { return educationList; }
    public List<Experience> getExperienceList() { return experienceList; }
    public List<Skill> getSkillList() { return skillList; }
    public List<Project> getProjectList() { return projectList; }
}

class PersonalDetails {
    private String fullName;
    private String email;
    private String phone;
    private String summary;
    
    public PersonalDetails(String fullName, String email, String phone, String summary) {
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.summary = summary;
    }
    // Getters/Setters omitted for brevity but recommended in a full project
}

class Education {
    private String school;
    private String degree;
    private String dates;
    
    public Education(String school, String degree, String dates) {
        this.school = school;
        this.degree = degree;
        this.dates = dates;
    }
}

class Experience {
    private String company;
    private String position;
    private String dates;
    private String description;
    
    public Experience(String company, String position, String dates, String description) {
        this.company = company;
        this.position = position;
        this.dates = dates;
        this.description = description;
    }
}

class Skill {
    private String name;
    private String level;
    
    public Skill(String name, String level) {
        this.name = name;
        this.level = level;
    }
}

class Project {
    private String name;
    private String description;
    
    public Project(String name, String description) {
        this.name = name;
        this.description = description;
    }
}
