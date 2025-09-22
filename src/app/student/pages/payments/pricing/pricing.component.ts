import { Component } from '@angular/core';
import { SharedModule } from '../../../../shared/shared.module';

@Component({
  selector: 'app-pricing',
  imports: [SharedModule],
  templateUrl: './pricing.component.html',
  styleUrl: './pricing.component.scss'
})
export class PricingComponent {
  pricingPlans = [
    {
      ribbon: { text: 'Start', colorClass: 'bg-accent', visible: true },
      icon: 'person',
      title: 'Student',
      desc: 'Access to over 1.000 high quality courses. For individuals.',
      price: 9,
      btnClass: 'btn btn-accent',
      btnText: 'Get started',
      link: 'signup.html'
    },
    {
      ribbon: null, // No ribbon
      icon: 'group',
      title: 'Team',
      desc: 'Starts with 3 accounts with more seats available.',
      price: 19,
      btnClass: 'btn btn-outline-secondary',
      btnText: 'Get started',
      link: 'signup.html'
    },
    {
      ribbon: null,
      icon: 'business_center',
      title: 'Enterprise',
      desc: 'Build customized learning paths with content that aligns to your internal learning goals.',
      price: 49,
      btnClass: 'btn btn-outline-secondary',
      btnText: 'Get started',
      link: 'signup.html'
    }
  ];

  // Features (for "All plans include")
  features = [
    '24h Access to PRO Courses',
    'Join 2000+ Community Members',
    'Access to New Courses Weekly',
    'Support from our Tutors',
    'Assets Included per Course'
  ];

  // Feedback
  feedbacks = [
    {
      text: 'A wonderful course on how to start. Eddie beautifully conveys all essentials of a becoming a good Angular developer. Very glad to have taken this course. Thank you Eddie Bryan.',
      name: 'Umberto Kass',
      initials: 'UK',
      rating: 4
    },
    {
      text: 'This platform really boosted my confidence. The structure and flow of content are excellent.',
      name: 'Sara Lee',
      initials: 'SL',
      rating: 5
    },
    {
      text: 'Good content and supportive tutors. Highly recommend it.',
      name: 'John Doe',
      initials: 'JD',
      rating: 4
    }
  ];

  // FAQs
  faqs = [
    {
      question: 'Do you offer a free trial?',
      answer: 'We offer everyone a 7 day free trial! You can take advantage of it by visiting our sign-up page! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro, ab!'
    },
    {
      question: 'Can I gift a subscription to someone?',
      answer: 'Yes! We do offer certificates. Please email us for more information. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eos, ad!'
    },
    {
      question: 'I have a great idea for an application or website, but need help on where to begin. Can you guys help me?',
      answer: 'We advise posting personal requests in our Community Forum Lorem ipsum dolor sit amet.'
    },
    {
      question: 'I found a bug. Where can I report that?',
      answer: 'In the unlikely situation you stumble across a bug, go ahead and shoot us an email. Lorem ipsum dolor sit amet.'
    }
  ];

  // helper to create rating stars
  getStars(count: number): string[] {
    return Array(count).fill('star').concat(Array(5 - count).fill('star_border'));
  }

}
