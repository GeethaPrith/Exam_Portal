import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';
import { LayoutComponent } from './student/layout/layout.component';

export const routes: Routes = [
  // Main application routes (Student portal)
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      {
        path: 'home',
        loadComponent: () =>
          import('./student/pages/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'exams',
        children: [
          {
            path: 'browse',
            loadComponent: () =>
              import('./student/pages/exams/browse-exams/browse-exams.component')
                .then(m => m.BrowseExamsComponent)
          },
          {
            path: 'demo',
            loadComponent: () =>
              import('./student/pages/exams/exam-page/exam-page.component')
                .then(m => m.ExamPageComponent)
          }
        ]
      },
      {
        path: 'account',
        children: [
          {
            path: 'edit-account',
            loadComponent: () =>
              import('./student/pages/accounts/edit-account/edit-account.component')
                .then(m => m.EditAccountComponent)
          },
          {
            path: 'profile',
            loadComponent: () =>
              import('./student/pages/accounts/profile/profile.component')
                .then(m => m.ProfileComponent)
          },
          {
            path: 'password',
            loadComponent: () =>
              import('./student/pages/accounts/account-password/account-password.component')
                .then(m => m.AccountPasswordComponent)
          }
        ]
      },
      {
        path: 'auth',
        children: [
          {
            path: 'login',
            loadComponent: () =>
              import('./student/pages/auth/login/login.component')
                .then(m => m.LoginComponent)
          },
          {
            path: 'signup',
            loadComponent: () =>
              import('./student/pages/auth/signup/signup.component')
                .then(m => m.SignupComponent)
          },
          {
            path: 'password',
            loadComponent: () =>
              import('./student/pages/auth/password-form/password-form.component')
                .then(m => m.PasswordFormComponent)
          },
          {
            path: 'reset-password',
            loadComponent: () =>
              import('./student/pages/auth/reset-password/reset-password.component')
                .then(m => m.ResetPasswordComponent)
          },
          {
            path: 'change-password',
            loadComponent: () =>
              import('./student/pages/auth/change-password/change-password.component')
                .then(m => m.ChangePasswordComponent)
          }
        ]
      },
      {
        path: 'payments',
        children: [
          {
            path: 'pricing',
            loadComponent: () =>
              import('./student/pages/payments/pricing/pricing.component')
                .then(m => m.PricingComponent)
          },
          {
            path: 'payment',
            loadComponent: () =>
              import('./student/pages/payments/payment/payment.component')
                .then(m => m.PaymentComponent)
          }
        ]
      }
    ]
  },

  // Admin routes (Completely separate from main layout)
  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/admin-layout/admin-layout.component')
        .then(m => m.AdminLayoutComponent),
    children: [
      {
        path: '',
        redirectTo: 'signin',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./admin/pages/dashboard/dashboard.component')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'signin',
        loadComponent: () =>
          import('./admin/pages/admin-signin/admin-signin.component')
            .then(m => m.AdminSigninComponent)
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./admin/pages/admin-register/admin-register.component')
            .then(m => m.AdminRegisterComponent)
      },
      {
        path: 'teacher/signin',
        loadComponent: () =>
          import('./admin/pages/teacher-signin/teacher-signin.component')
            .then(m => m.TeacherSigninComponent)
      },
      {
        path: 'createExam',
        loadComponent: () =>
          import('./admin/pages/create-exam/create-exam.component')
            .then(m => m.CreateExamComponent)

      },
      {
        path: 'add-student',
        loadComponent: () =>
          import('./admin/pages/add-student/add-student.component')
            .then(m => m.AddStudentComponent)
      },
    ]
  },
  { path: '**', redirectTo: 'home' }
];



