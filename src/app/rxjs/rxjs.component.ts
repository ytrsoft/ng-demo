import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../shared.module';
import {
  Observable,
  of,
  from,
  combineLatest,
  Subject,
  forkJoin,
  merge,
  concat,
  zip,
  race,
  interval
} from 'rxjs';
import {
  map,
  filter,
  mergeMap,
  catchError,
  debounceTime,
  delay,
  take
} from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  imports: [SharedModule],
  templateUrl: './rxjs.component.html',
  styleUrl: './rxjs.component.scss',
  standalone: true
})
export class RxjsComponent implements OnInit {
  results: string[] = [];
  private searchSubject = new Subject<string>();

  ngOnInit() {
    // 常用操作符演示
    this.demoOf();
    this.demoFrom();
    this.demoMap();
    this.demoFilter();
    this.demoMergeMap();
    this.demoCatchError();
    this.demoDebounceTime();
    this.demoCombineLatest();

    // 并发操作符演示
    this.demoForkJoin();
    this.demoMerge();
    this.demoConcat();
    this.demoZip();
    this.demoRace();
  }

  // 1. of - 创建发出固定值的 Observable
  demoOf() {
    const source: Observable<string> = of('Hello', 'World');
    source.subscribe(value => this.results.push(`of 示例: ${value}`));
  }

  // 2. from - 从数组或其他可迭代对象创建 Observable
  demoFrom() {
    const source: Observable<number> = from([1, 2, 3, 4]);
    source.subscribe(value => this.results.push(`from 示例: ${value}`));
  }

  // 3. map - 转换 Observable 的值
  demoMap() {
    const source: Observable<number> = of(1, 2, 3);
    source
      .pipe(map(value => value * 2))
      .subscribe(value => this.results.push(`map 示例: ${value}`));
  }

  // 4. filter - 过滤 Observable 的值
  demoFilter() {
    const source: Observable<number> = of(1, 2, 3, 4, 5);
    source
      .pipe(filter(value => value % 2 === 0))
      .subscribe(value => this.results.push(`filter 示例: ${value}`));
  }

  // 5. mergeMap - 映射到另一个 Observable 并合并结果
  demoMergeMap() {
    const source: Observable<string> = of('a', 'b');
    source
      .pipe(mergeMap(value => of(`${value.toUpperCase()}!`)))
      .subscribe(value => this.results.push(`mergeMap 示例: ${value}`));
  }

  // 6. catchError - 处理错误
  demoCatchError() {
    const source: Observable<string> = new Observable(subscriber => {
      subscriber.next('Good');
      subscriber.error('Error occurred');
    });
    source
      .pipe(catchError(err => of(`错误已捕获: ${err}`)))
      .subscribe(value => this.results.push(`catchError 示例: ${value}`));
  }

  // 7. debounceTime - 防抖，延迟发出值
  demoDebounceTime() {
    this.searchSubject
      .pipe(debounceTime(500))
      .subscribe(value => this.results.push(`debounceTime 示例: 搜索 "${value}"`));
    this.simulateSearch('Angular');
    setTimeout(() => this.simulateSearch('RxJS'), 200); // 不会触发
    setTimeout(() => this.simulateSearch('TypeScript'), 600); // 会触发
  }

  // 模拟搜索输入
  simulateSearch(value: string) {
    this.searchSubject.next(value);
  }

  // 8. combineLatest - 组合多个 Observable
  demoCombineLatest() {
    const obs1: Observable<number> = of(1, 2);
    const obs2: Observable<string> = of('x', 'y');
    combineLatest([obs1, obs2]).subscribe(([num, letter]) =>
      this.results.push(`combineLatest 示例: ${num}${letter}`)
    );
  }

  // 9. forkJoin - 等待所有 Observable 完成，获取最后的值
  demoForkJoin() {
    const obs1: Observable<string> = of('Task 1').pipe(delay(1000));
    const obs2: Observable<number> = of(42).pipe(delay(500));
    forkJoin([obs1, obs2]).subscribe(([val1, val2]) =>
      this.results.push(`forkJoin 示例: ${val1}, ${val2}`)
    );
  }

  // 10. merge - 合并多个 Observable，按时间顺序发出值
  demoMerge() {
    const obs1: Observable<string> = interval(1000).pipe(
      map(val => `Source 1: ${val}`),
      take(3)
    );
    const obs2: Observable<string> = interval(500).pipe(
      map(val => `Source 2: ${val}`),
      take(3)
    );
    merge(obs1, obs2).subscribe(value =>
      this.results.push(`merge 示例: ${value}`)
    );
  }

  // 11. concat - 按顺序连接 Observable
  demoConcat() {
    const obs1: Observable<string> = of('First').pipe(delay(1000));
    const obs2: Observable<string> = of('Second').pipe(delay(500));
    concat(obs1, obs2).subscribe(value =>
      this.results.push(`concat 示例: ${value}`)
    );
  }

  // 12. zip - 按顺序配对多个 Observable 的值
  demoZip() {
    const obs1: Observable<number> = of(1, 2, 3);
    const obs2: Observable<string> = of('a', 'b', 'c');
    zip(obs1, obs2).subscribe(([num, letter]) =>
      this.results.push(`zip 示例: ${num}${letter}`)
    );
  }

  // 13. race - 发出最先发出值的 Observable 的值
  demoRace() {
    const obs1: Observable<string> = of('Slow').pipe(delay(1000));
    const obs2: Observable<string> = of('Fast').pipe(delay(500));
    race(obs1, obs2).subscribe(value =>
      this.results.push(`race 示例: ${value}`)
    );
  }
}
