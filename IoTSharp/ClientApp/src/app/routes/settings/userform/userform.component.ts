import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient } from '@delon/theme';
import { Guid } from 'guid-typescript';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { appmessage } from 'src/app/models/appmessage';
import { MyValidators } from '../../util/myvalidators';

@Component({
  selector: 'app-userform',
  templateUrl: './userform.component.html',
  styleUrls: ['./userform.component.less']
})
export class UserformComponent implements OnInit {

  isManufactorLoading: Boolean = false;

  optionList: any;
  @Input() id: string = '-1';

  nodes = [];

  title: string = '';

  loading = false;
  avatarUrl?: string;
  constructor(
    private _router: ActivatedRoute,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _httpClient: _HttpClient,
    private fb: FormBuilder,
    private msg: NzMessageService,
    private drawerRef: NzDrawerRef<string>,
  ) { }
  form!: FormGroup;
  submitting = false;
  ngOnInit() {

    const { nullbigintid, zip, email, mobile } = MyValidators;

    this.form = this.fb.group({
      email: [null, [Validators.required, email]],
      id: [Guid.EMPTY, []],
      phoneNumber: ['', [mobile]],
    });

    if (this.id !== '-1') {
      this._httpClient.get<appmessage<any>>('api/Account/Get?Id=' + this.id).subscribe(
        {
          next: (x) => {
            this.form.patchValue(x.data);
          },
          error: (y) => { },
          complete: () => { },
        }
      );
    }
  }

  submit() {
    this.submitting = true;

    if (this.id !== Guid.EMPTY) {
      this._httpClient.put<appmessage<any>>('api/Account/Modify', this.form.value).subscribe(
        {
          next: (x) => {
            this.submitting = false;
            this.msg.create('success', '用户信息保存成功');
            this.close();
          },
          error: (y) => { },
          complete: () => { },
        }
      );

    } else {



    }
  }
  close(): void {
    this.drawerRef.close(this.id);
  }
}
