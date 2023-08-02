import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
})
export class DashboardComponent implements OnInit {
  componentName: string = '';
  selectedLanguage: string = 'javascript';
  formElements: any[] = [];

  ngOnInit() {}

  addFormElement() {
    this.formElements.push({
      type: "",
      name: "",
      validator: "",
    });
  }

  removeFormElement(index: number) {
    this.formElements.splice(index, 1);
  }
}
