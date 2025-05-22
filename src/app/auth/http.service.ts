import { HttpClient, HttpParams, HttpHeaders, HttpEventType } from '@angular/common/http'
import { inject, Injectable } from '@angular/core'
import { Observable, tap } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private http = inject(HttpClient)

  // GET请求
  getData(url: string, params?: any): Observable<any> {
    const options = {
      params: new HttpParams({ fromObject: params }),
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
    return this.http.get(url, options)
  }

  // POST请求
  postData(url: string, body: any): Observable<any> {
    return this.http.post(url, body, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    })
  }

  // PUT请求
  updateData(url: string, body: any): Observable<any> {
    return this.http.put(url, body)
  }

  // DELETE请求
  deleteData(url: string): Observable<any> {
    return this.http.delete(url)
  }

  // 文件上传
  uploadFile(url: string, file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file)
    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    })
  }

  // 文件下载
  downloadFile(url: string): Observable<Blob> {
    return this.http.get(url, { responseType: 'blob' })
  }

  // 带进度监控的上传
  uploadWithProgress(url: string, file: File): Observable<any> {
    const formData = new FormData()
    formData.append('file', file)

    return this.http.post(url, formData, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      tap((event) => {
        if (event.type === HttpEventType.UploadProgress) {
          const progress = Math.round(100 * event.loaded / (event.total || 1))
          console.log(`上传进度: ${progress}%`)
        }
      })
    )
  }

  // 带查询参数的请求
  getWithQueryParams(url: string, queryParams: any): Observable<any> {
    return this.http.get(url, {
      params: new HttpParams({ fromObject: queryParams })
    })
  }

  // 带自定义请求头的请求
  getWithCustomHeaders(url: string): Observable<any> {
    const headers = new HttpHeaders()
      .set('Authorization', 'Bearer token')
      .set('X-Custom-Header', 'value')
    return this.http.get(url, { headers })
  }
}
