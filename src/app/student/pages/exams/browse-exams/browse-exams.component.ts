import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

interface Exam {
  name: string;
  duration: string;
  questions: number;
  level: string;
}

interface ExamPackage {
  id:number;
  title: string;
  author: string;
  image: string;
  imageSmall: string;
  previewUrl: string;
  rating: number;
  isFavorite: boolean;
  exams: Exam[];
}
@Component({
  selector: 'app-browse-exams',
  imports: [SharedModule],
  templateUrl: './browse-exams.component.html',
  styleUrl: './browse-exams.component.scss'
})
export class BrowseExamsComponent {
    examPackages: ExamPackage[] = [
    {
      id: 1,
      title: 'Math & Reasoning',
      author: 'ExamPrep Team',
      image: '../../public/images/paths/math_430x168.png',
      imageSmall: '../../public/images/paths/math_40x40@2x.png',
      previewUrl: 'exam-package.html',
      rating: 5,
      isFavorite: true,
      exams: [
        { name: 'Mathematics', duration: '60 min', questions: 50, level: 'Intermediate' },
        { name: 'Reasoning', duration: '45 min', questions: 40, level: 'Intermediate' },
        { name: 'Data Interpretation', duration: '30 min', questions: 30, level: 'Beginner' },
        { name: 'Quantitative Aptitude', duration: '50 min', questions: 50, level: 'Intermediate' }
      ]
    },
    {
      id: 2,
      title: 'English & Science',
      author: 'ExamPrep Team',
      image: '../../public/images/paths/english_430x168.png',
      imageSmall: '../../public/images/paths/english_40x40@2x.png',
      previewUrl: 'exam-package.html',
      rating: 4,
      isFavorite: false,
      exams: [
        { name: 'English Grammar', duration: '40 min', questions: 35, level: 'Beginner' },
        { name: 'Vocabulary', duration: '30 min', questions: 30, level: 'Beginner' },
        { name: 'Science Basics', duration: '60 min', questions: 50, level: 'Intermediate' },
        { name: 'Physics', duration: '50 min', questions: 40, level: 'Intermediate' },
        { name: 'Chemistry', duration: '45 min', questions: 35, level: 'Intermediate' }
      ]
    }
  ];

  toggleFavorite(pkg: ExamPackage) {
    pkg.isFavorite = !pkg.isFavorite;
  }

  examPackage = [
  {
    id: 1,
    name: 'Maths Package',
    link: '/exam/maths',
    image: '/assets/images/maths.jpg',
    duration: '30 Days',
    attempts: 'Unlimited',
    exams: [
      { id: 1, title: 'Algebra Basics' },
      { id: 2, title: 'Geometry Mastery' },
      { id: 3, title: 'Trigonometry Test' },
      { id: 4, title: 'Calculus Practice' }
    ]
  },
  {
    id: 2,
    name: 'English Package',
    link: '/exam/english',
    image: '/assets/images/english.jpg',
    duration: '45 Days',
    attempts: 'Unlimited',
    exams: [
      { id: 1, title: 'Grammar & Usage' },
      { id: 2, title: 'Reading Comprehension' },
      { id: 3, title: 'Vocabulary Builder' },
      { id: 4, title: 'Writing Skills' }
    ]
  },
  {
    id: 3,
    name: 'Science Package',
    link: '/exam/science',
    image: '/assets/images/science.jpg',
    duration: '60 Days',
    attempts: 'Unlimited',
    exams: [
      { id: 1, title: 'Physics Fundamentals' },
      { id: 2, title: 'Chemistry Basics' },
      { id: 3, title: 'Biology Concepts' },
      { id: 4, title: 'Environmental Science' }
    ]
  },
  {
    id: 4,
    name: 'Reasoning Package',
    link: '/exam/reasoning',
    image: '/assets/images/reasoning.jpg',
    duration: '30 Days',
    attempts: 'Unlimited',
    exams: [
      { id: 1, title: 'Logical Reasoning' },
      { id: 2, title: 'Analytical Puzzles' },
      { id: 3, title: 'Data Interpretation' },
      { id: 4, title: 'Verbal Reasoning' }
    ]
  }
];
examsPackages = [
  {
    id: 1,
    name: 'Maths Package',
    link: '/exam/maths',
    image: '/assets/images/maths_430x168.png',
    thumb: '/assets/images/maths_40x40.png',
    description: 'Covers all key concepts in Algebra, Geometry, Trigonometry, and Calculus.',
    duration: '30 Days',
    attempts: 'Unlimited',
    exams: [
      { id: 1, title: 'Algebra Basics' },
      { id: 2, title: 'Geometry Mastery' },
      { id: 3, title: 'Trigonometry Test' },
      { id: 4, title: 'Calculus Practice' }
    ],
    features: [
      'Topic-wise exams',
      'Detailed solutions',
      'Performance tracking',
      'Timed tests'
    ]
  },
  {
    id: 2,
    name: 'English Package',
    link: '/exam/english',
    image: '/assets/images/english_430x168.png',
    thumb: '/assets/images/english_40x40.png',
    description: 'Strengthen grammar, vocabulary, reading, and writing skills.',
    duration: '45 Days',
    attempts: 'Unlimited',
    exams: [
      { id: 1, title: 'Grammar & Usage' },
      { id: 2, title: 'Reading Comprehension' },
      { id: 3, title: 'Vocabulary Builder' },
      { id: 4, title: 'Writing Skills' }
    ],
    features: [
      'Grammar-focused tests',
      'Reading passages with questions',
      'Essay practice',
      'Mock exams'
    ]
  }
];

}
