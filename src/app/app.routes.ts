import { Routes } from '@angular/router';
import { ExamPageComponent } from './components/exam-page/exam-page.component';
import { RegisterComponent } from './components/register/register.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { StudentProfileComponent } from './components/student-profile/student-profile.component';

export const routes: Routes = [
    {
        path: '',
        component: ExamPageComponent,
        pathMatch: 'full'

    },
    {
        path: 'exam',
        component: ExamPageComponent,

    },
    {
        path: 'register',
        component: RegisterComponent
    },
    {
        path:'signIn',
        component:SignInComponent
    },
    {
        path:'student-profile',
        component:StudentProfileComponent
    },
    {
        path: '**', redirectTo: ''  // wildcard for unknown routes

    }
];
