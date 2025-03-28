import { setError, setSuccess } from '../slices/message-slice';
import { setSimilarityScore } from '../slices/storage-slice';
import { aiCheckSlice } from './api-slice';

export const extendAiCheckSlice = aiCheckSlice.injectEndpoints({
    endpoints: (builder) => ({
        checkPlagiarism: builder.mutation({
            query: ({ file1, file2, token}) => {
                const formData = new FormData()
                formData.append('file1', file1)
                formData.append('file2', file2)

                return {
                    url: 'plagiarism',
                    method: 'POST',
                    headers: {
                        'content-type': 'multipart/form-data',
                        'authorization': `Bearer ${token}`,
                    },
                    body: formData,
                }
            },
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const { meta, data } = await queryFulfilled;
                   
                    console.log(data)                    
                    dispatch(setSimilarityScore(data?.plagiarism_result?.similarity_percentage))
                } catch (error) {
                    dispatch(setError(error?.message || error?.error?.message || 'Error checking plagiarism'))
                }
            },
        }),
    }),
})

export const { useCheckPlagiarismMutation } = extendAiCheckSlice