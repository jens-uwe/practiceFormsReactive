import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[directiveScaleLabel]'
})
export class ScaleLabelDirective implements OnInit {
  label : HTMLLabelElement | undefined;
  formInput : ChildNode | undefined;

  constructor(private elRef: ElementRef, private r: Renderer2) {
    
  }

  ngOnInit(): void {
    this.label = (this.elRef.nativeElement as HTMLDivElement).firstChild as HTMLLabelElement;
    this.formInput = (this.elRef.nativeElement as HTMLDivElement).lastChild;
    this.elRef.nativeElement.classList.add('scaleLabel');
    this.elRef.nativeElement.style.position ="relative";
    this.label.classList.add('like-placeholder');
    this.label.style.backgroundColor = "transparent";
    this.formInput.addEventListener("focus", ()=>{this.scaleLabel(false)});
    this.formInput.addEventListener("blur",()=>{this.scaleLabel(true)})
  }

  scaleLabel(input: boolean): void {
    console.log(input);
    const typ: string = this.formInput.nodeName;
    if (input && (typ=='INPUT' || typ=='SELECT')) {
      console.log((this.formInput as HTMLInputElement).value);
      if ((this.formInput as HTMLInputElement).value=='') {
        this.label.classList.add('like-placeholder');
      }
    }
    else {
      this.label.classList.remove('like-placeholder');
    }
  }
}
