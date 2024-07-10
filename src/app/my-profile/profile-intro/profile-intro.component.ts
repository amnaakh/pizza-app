import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile-intro',
  standalone: true,
  imports: [RouterLink, MatCardModule, MatButtonModule,CommonModule],
  templateUrl: './profile-intro.component.html',
  styleUrls: ['./profile-intro.component.scss']
})
export class ProfileIntroComponent implements OnInit {
  clockInTime: string | null = null;
  clockOutTime: string | null = null;
  buttonText: string = 'Clock In'; 
  status: string = 'Clocked out'; 

  ngOnInit(): void {
    this.loadTimes();
  }

  loadTimes(): void {
    this.clockInTime = localStorage.getItem('clockInTime');
    this.clockOutTime = localStorage.getItem('clockOutTime');
    if (this.clockInTime) {
      this.buttonText = 'Clock Out'; 
      this.status = this.clockOutTime ? 'Clocked out' : 'Clocked in As Administrator';
    } else if (this.clockOutTime) {
      this.status = 'Clocked out';
      this.buttonText = 'Clock In';
    }
  }

  setClockInTime(): void {
    if (this.buttonText === 'Clock Out') {
      if (confirm('Are you sure you want to clock out?')) {
        this.clockOutTime = this.formatDateTime(new Date());
        localStorage.setItem('clockOutTime', this.clockOutTime);
        this.buttonText = 'Clock In';
        this.status = 'Clocked out';
        alert('Adam K is clocked out');
      }
    } else {
      const now = new Date();
      this.clockInTime = this.formatDateTime(now);
      localStorage.setItem('clockInTime', this.clockInTime);
      localStorage.removeItem('clockOutTime');
      this.clockOutTime = null;
      this.buttonText = 'Clock Out';
      this.status = 'Clocked in As Administrator';
      alert('Adam K is clocked in');
    }
  }

  formatDateTime(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = String(date.getFullYear()).slice(-2); 

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    
    hours = hours % 12;
    hours = hours ? hours : 12; 
    const strHours = String(hours).padStart(2, '0');

    return `${day}-${month}-${year} ${strHours}:${minutes}:${seconds} ${ampm}`;
  }
}
