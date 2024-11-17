import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  currentUser: any;
  isAuthenticated: boolean = false;
  profile = {
    name: '',
    email: '',
    phone: '',
    birthday: '',
    country: '',
    state: '',
    permanentAddress: '',
    officeAddress: '',
    homeAddress: '',
    imageUrl: 'https://via.placeholder.com/100'  // Default image
  };

  constructor(
    public userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.currentUser = this.authService.currentUserValue;
    console.log("Current User Data:", this.currentUser); // Log currentUser to check data

    if (this.currentUser) {
      this.profile.name = this.currentUser.custName || '';
      this.profile.email = this.currentUser.custEmail || '';
      this.profile.phone = this.currentUser.custMobile || '';
      // Add more fields as needed based on `currentUser`
    } else {
      console.warn("No current user data available.");
    }

    this.isAuthenticated = this.authService.isLoggedIn();
    console.log("Is Authenticated:", this.isAuthenticated);
  }

  onImageUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.profile.imageUrl = e.target.result;
        console.log("Image URL set:", this.profile.imageUrl); // Log the image URL
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  updateProfile(): void {
    console.log('Profile updated:', this.profile);
    // Add code here to send updated profile data to the server, if needed
  }

  goBack(): void {
    console.log('Going back');
    // Implement navigation logic if needed
  }

  editProfile(): void {
    console.log('Edit profile');
    // Implement edit logic if needed
  }
}
