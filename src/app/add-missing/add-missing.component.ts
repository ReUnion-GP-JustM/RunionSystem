import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators  } from '@angular/forms';
import { HomelessService } from '../homeless.service'
@Component({
  selector: 'app-add-missing',
  templateUrl: './add-missing.component.html',
  styleUrls: ['./add-missing.component.scss']
})
export class AddMissingComponent implements OnInit {
  images:any;
  constructor(public _HomelessService: HomelessService) { }

  addMissing = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.pattern(/^[\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{2,20}$/)]),
    age: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(3)]),
    city: new FormControl('القاهره', [Validators.required]),
    shelterName: new FormControl('الملاجئ', [Validators.required]),
    gender: new FormControl('male', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    foundTime: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required, Validators.pattern(/^[\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{2,20}$/)]),
    finderName: new FormControl('', [Validators.required, Validators.pattern(/^[\u0621-\u064Aء-ئ][^#&<>\"~;$^%{}?]{2,20}$/)]),
    nationID: new FormControl('', [Validators.required, Validators.pattern(/(2|3)[0-9][1-9][0-1][1-9][0-3][1-9](01|02|03|04|11|12|13|14|15|16|17|18|19|21|22|23|24|25|26|27|28|29|31|32|33|34|35|88)\d\d\d\d\d/)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)]),
    finderEmail: new FormControl('', [Validators.email, Validators.required])

  });
  ngOnInit(): void {


  }

  selectImage(event:any){
        if(event.target.files.length>0){
          const file = event.target.files[0];
          this.images = file;
          console.log(this.images);
          
        }
  }
  handelAddMissing() {
    if (this.addMissing.valid) {
  
      const formData = new  FormData();
      formData.append("img" ,this.images);
      formData.append("name" ,this.addMissing.controls.name.value);
      formData.append("endAge" ,this.addMissing.controls.age.value +5);
      formData.append("startAge" ,this.addMissing.controls.age.value);
      formData.append("gender" ,this.addMissing.controls.gender.value);

      
     let searchObject = {
      name: this.addMissing.controls.name.value,
      endAge: this.addMissing.controls.age.value +5,
      startAge :this.addMissing.controls.age.value,
      gender:this.addMissing.controls.gender.value,
      // img: this.addMissing.controls.image.value
     }


      let object = {
        name: this.addMissing.controls.name.value,
        age: this.addMissing.controls.age.value,
        city: this.addMissing.controls.city.value,
        shelterName: this.addMissing.controls.shelterName.value,
        img: this.addMissing.controls.image.value,
        foundTime: this.addMissing.controls.foundTime.value,
        description: this.addMissing.controls.description.value,
        gender: this.addMissing.controls.gender.value,
        finderName: this.addMissing.controls.city.value,
        nationID: this.addMissing.controls.image.value,
        phoneNumber: this.addMissing.controls.description.value,
        finderEmail: this.addMissing.controls.finderEmail.value,
      }
      console.log(searchObject);
      
      this._HomelessService.seachINReport(formData).subscribe(response => {
        console.log(response);

      })
    }
  }
}
