import { Directive, Input, OnInit, HostBinding, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[directiveDivView]'
})
export class DivViewDirective implements OnInit{

  @Input('directiveDivView') input: string = ""
  @HostBinding('style.backgroundColor') backgroundColor: string | undefined;


  constructor(private elRef: ElementRef, private r: Renderer2) {
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const jsonInput: {backgroundColor: string, title: string} = JSON.parse(this.input)
    const nameDiv = this.r.createElement('p');
    const text = this.r.createText(jsonInput.title);
    this.r.appendChild(nameDiv,text);

    this.backgroundColor = jsonInput.backgroundColor;
    this.r.setStyle(this.elRef.nativeElement, 'border', '2px solid black');
    this.r.setStyle(this.elRef.nativeElement, 'border-radius', '5px');
    this.r.setStyle(this.elRef.nativeElement, 'padding', '2px');
    this.r.setStyle(this.elRef.nativeElement, 'margin', '10px');
    this.r.appendChild(this.elRef.nativeElement, nameDiv); 
    this.r.setStyle(nameDiv, 'text-align','right');
  }


}
