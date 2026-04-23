package com.resumebuilder.controller;

import com.resumebuilder.model.Resume;
import com.resumebuilder.service.ResumeService;

public class ResumeController {
    private Resume currentResume;
    private ResumeService resumeService;

    public ResumeController() {
        this.currentResume = new Resume();
        this.resumeService = new ResumeService();
    }

    public void updatePersonalDetails(String name, String email) {
        // Logic to update model
    }

    public Resume getCurrentResume() {
        return currentResume;
    }
}
