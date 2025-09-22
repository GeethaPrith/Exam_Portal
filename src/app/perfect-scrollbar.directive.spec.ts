import { PerfectScrollbarDirective } from './perfect-scrollbar.directive';

describe('PerfectScrollbarDirective', () => {
  it('should create an instance', () => {
    const mockElementRef = { nativeElement: document.createElement('div') } as any;
    const directive = new PerfectScrollbarDirective(mockElementRef);
    expect(directive).toBeTruthy();
  });
});
