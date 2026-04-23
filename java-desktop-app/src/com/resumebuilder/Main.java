package com.resumebuilder;

import javax.swing.*;
import java.awt.*;

public class Main {
    public static void main(String[] args) {
        SwingUtilities.invokeLater(() -> {
            JFrame frame = new JFrame("Professional Resume Builder");
            frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
            frame.setSize(1200, 800);
            frame.setLayout(new BorderLayout());

            // Sidebar
            JPanel sidebar = new JPanel();
            sidebar.setPreferredSize(new Dimension(300, 800));
            sidebar.setBackground(new Color(33, 37, 41));
            sidebar.add(new JLabel("<html><font color='white'>Editor Sidebar</font></html>"));

            // Preview Area
            JPanel preview = new JPanel();
            preview.setBackground(Color.LIGHT_GRAY);
            preview.add(new JLabel("Resume Live Preview"));

            frame.add(sidebar, BorderLayout.WEST);
            frame.add(preview, BorderLayout.CENTER);

            // Menu Bar
            JMenuBar mb = new JMenuBar();
            JMenu m1 = new JMenu("File");
            JMenuItem i1 = new JMenuItem("Export as PDF");
            m1.add(i1);
            mb.add(m1);
            frame.setJMenuBar(mb);

            frame.setVisible(true);
        });
    }
}
