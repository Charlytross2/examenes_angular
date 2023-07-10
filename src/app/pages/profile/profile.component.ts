import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  user: any = new Object();
  image: any;

  constructor(
    private service: LoginService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.service.getCurrentUser().subscribe((data) => {
      this.user = data;
      if (
        this.user.perfil == 'default.png' ||
        this.user.perfil == '' ||
        this.user.perfil == 'perfil.png' ||
        this.user.perfil == null
      ) {
        this.image = './assets/default.png';
      } else {
        this.userService.getFoto(this.user.perfil).subscribe({
          next: (data) => {
            const reader = new FileReader();
            reader.onloadend = () => {
              this.image = reader.result as string;
            };
            reader.readAsDataURL(data);
          },
        });
      }
    });
  }
}
