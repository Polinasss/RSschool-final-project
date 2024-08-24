import { Component, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RoleService } from '../guards/role.service';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  public roleService = inject(RoleService);

  public isAdmin: boolean = false;

  public isClient: boolean = false;

  public isGuest: boolean = true;

  ngOnInit(): void {
    const role = this.roleService.userRole;
    this.isAdmin = role.toLocaleLowerCase().includes('admin');
    this.isClient = role.toLocaleLowerCase().includes('client');
    this.isGuest = role.toLocaleLowerCase().includes('guest');
  }
}
