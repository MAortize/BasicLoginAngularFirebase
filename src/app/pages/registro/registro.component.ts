import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../models/usuario.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;
  recordar=false;


  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() { 
    this.usuario= new UsuarioModel();
  
  }


  onSubmit(form: NgForm){

    

    if (form.invalid) {
      return;
    }

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor'
    });

    Swal.showLoading();

    this.auth.registrarNuevoUsuario(this.usuario).subscribe(resp=>{

      console.log(resp);
      Swal.close();
      if (this.recordar) {
        localStorage.setItem('email',this.usuario.email);
      }
      this.router.navigateByUrl('home')
      

    }, (err)=>{
      console.log(err.error.error.message);
      Swal.fire({
        icon: 'error',
        title: 'error al autenticar',
        text: err.error.error.message
      });
      
    })
    
    
    
  }


}
