import { Component, ElementRef, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { gsap } from 'gsap';

@Component({
  selector: 'app-xxe-attack-animation',
  templateUrl: './xxe-attack-animation.component.html',
  styleUrls: ['./xxe-attack-animation.component.scss']
})
export class XxeAttackAnimationComponent implements OnInit, AfterViewInit {
  @ViewChildren('stepElements', { read: ElementRef }) stepElements!: QueryList<ElementRef>;
  currentStep = 0;

  steps = [
    { title: "Frontend (Browser)", request: "POST /ca/rest/certrequests HTTP/1.1\nHost: api-gateway.example.com\nContent-Type: application/xml\n\n<request><data>Q3liZXJ...</data></request>", description: "The browser sends a Base64-encoded XML request." },
    { title: "API Gateway", request: "POST /vulnerable-api HTTP/1.1\nHost: waf.example.com\nContent-Type: application/xml\n\n<request><data>Q3liZXJ...</data></request>", description: "The API Gateway forwards the request unchanged." },
    { title: "Web Application Firewall (WAF)", request: "POST /vulnerable-api HTTP/1.1\nHost: api.example.com\nContent-Type: application/xml\n\n<request><data>Q3liZXJ...</data></request>", description: "The WAF logs the request but does not decode the Base64 payload." },
    { title: "Vulnerable API Endpoint", request: "POST /process-xml HTTP/1.1\nHost: backend.example.com\nContent-Type: application/xml\n\n<request><data>Cybersecurity Consultancy\nAt InputTrace, we secure your digital future with innovative solutions.</data></request>", description: "The backend decodes the Base64, revealing the malicious payload." },
    { title: "XML Processor (Execution)", request: "Executing XXE payload...\nReading /etc/passwd...\nCybersecurity Consultancy\nAt InputTrace, we secure your digital future with innovative solutions.", description: "The XML processor executes the XXE payload, revealing sensitive data." }
  ];

  ngOnInit() {}

  ngAfterViewInit() {
    this.stepElements.forEach((step, index) => {
      gsap.set(step.nativeElement, { opacity: 0.3, y: 20 });
    });
  }

  nextStep() {
    if (this.currentStep < this.steps.length) {
      gsap.to(this.stepElements.toArray()[this.currentStep].nativeElement, { opacity: 1, y: 0, duration: 0.5 });
      this.currentStep++;
    }
  }
}
