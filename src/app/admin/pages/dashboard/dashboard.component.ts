import { Component } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';

@Component({
  selector: 'app-dashboard',
  imports: [SharedModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  stats = {
    totalStudents: 1247,
    totalTeachers: 89,
    activeExams: 23,
    completedExams: 156,
    totalRevenue: 45670,
    monthlyGrowth: 12.5
  };

  // Recent Activities
  recentActivities = [
    {
      id: 1,
      type: 'exam',
      title: 'New exam "Mathematics Final" created',
      user: 'Prof. Sarah Johnson',
      time: '2 minutes ago',
      icon: 'quiz'
    },
    {
      id: 2,
      type: 'user',
      title: '15 new students registered',
      user: 'System',
      time: '1 hour ago',
      icon: 'person_add'
    },
    {
      id: 3,
      type: 'result',
      title: 'Physics Exam results published',
      user: 'Dr. Michael Brown',
      time: '3 hours ago',
      icon: 'assignment'
    },
    {
      id: 4,
      type: 'system',
      title: 'System backup completed successfully',
      user: 'System',
      time: '6 hours ago',
      icon: 'cloud_done'
    }
  ];

  // Upcoming Exams
  upcomingExams = [
    {
      id: 1,
      title: 'Chemistry Midterm',
      subject: 'Chemistry',
      date: '2024-03-15',
      time: '10:00 AM',
      duration: '2 hours',
      students: 145
    },
    {
      id: 2,
      title: 'English Literature Quiz',
      subject: 'English',
      date: '2024-03-16',
      time: '2:00 PM',
      duration: '1 hour',
      students: 89
    },
    {
      id: 3,
      title: 'Biology Final Exam',
      subject: 'Biology',
      date: '2024-03-18',
      time: '9:00 AM',
      duration: '3 hours',
      students: 167
    }
  ];

  // Chart Data
  examStatsChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Exams Conducted',
        data: [12, 19, 15, 25, 22, 30],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.1)',
        tension: 0.4
      }
    ]
  };

  studentGrowthChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'New Registrations',
        data: [65, 78, 90, 81, 96, 105],
        backgroundColor: '#28a745',
        borderColor: '#28a745',
        borderWidth: 2
      }
    ]
  };

  constructor() { }

  ngOnInit(): void {
    // Initialize dashboard data
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Simulate API calls to load dashboard data
    // In real implementation, these would be actual API calls
  }

  getGrowthPercentage(): string {
    return this.stats.monthlyGrowth > 0 ? '+' + this.stats.monthlyGrowth : this.stats.monthlyGrowth.toString();
  }

  getGrowthIcon(): string {
    return this.stats.monthlyGrowth > 0 ? 'trending_up' : 'trending_down';
  }

  getGrowthColor(): string {
    return this.stats.monthlyGrowth > 0 ? 'text-success' : 'text-danger';
  }

  viewAllExams(): void {
    // Navigate to exams page
  }

  viewAllStudents(): void {
    // Navigate to students page
  }

  viewAllActivities(): void {
    // Navigate to activities page
  }
}
