import { Injectable } from '@nestjs/common'
import axios, { AxiosInstance } from 'axios'
import HttpAdapter from '../interfaces/http-adapter.interface'

@Injectable()
export class AxiosAdapter implements HttpAdapter {
  private axios: AxiosInstance = axios

  async get<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.get<T>(url)
      return data
    } catch (error) {
      throw new Error('Error - Check server logs')
    }
  }

  async post<T>(url: string, body: any): Promise<T> {
    try {
      const { data } = await this.axios.post<T>(url, body)
      return data
    } catch (error) {
      throw new Error('Error - Check server logs')
    }
  }

  async put<T>(url: string, body: any): Promise<T> {
    try {
      const { data } = await this.axios.put<T>(url, body)
      return data
    } catch (error) {
      throw new Error('Error - Check server logs')
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const { data } = await this.axios.delete<T>(url)
      return data
    } catch (error) {
      throw new Error('Error - Check server logs')
    }
  }
}
