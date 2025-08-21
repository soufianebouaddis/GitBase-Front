import axiosInstance from '../axios/axiosInstance';
import type { ApiResponse } from '../types/auth';
import type { createRepository, gitRepository } from '../types/git';


export const gitService = {

    async createRepository(gitRepository: createRepository): Promise<unknown> {
        try {
            const response = await axiosInstance.post<unknown>('/gitbase/create', gitRepository);

            return response.data;
        } catch (error) {
            throw this.handleError(error);
        }
    },


    handleError(error: any): Error {
        if (error.response?.data?.message) {
            return new Error(error.response.data.message);
        } else if (error.message) {
            return new Error(error.message);
        } else {
            return new Error('An unexpected error occurred');
        }
    }
}

