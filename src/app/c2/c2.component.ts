import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, ParamMap, Params } from '@angular/router'

@Component({
  selector: 'app-c2',
  imports: [],
  templateUrl: './c2.component.html',
  styleUrl: './c2.component.scss'
})
export class C2Component implements OnInit {

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((map: ParamMap) => {
      console.log('id', map.get('id'))
    })
    this.route.queryParams.subscribe((map: Params) => {
      console.log('query', map)
    })
  }


}
