import { useMutation, noop } from '@tanstack/react-query'

const useMutationHandler = ({
  mutationFn = noop,
  errorCb = noop,
  successCb = noop,
  settledCb = noop,
  ...config
}) => {
  const mutation = useMutation({
    mutationFn,
    onSuccess: (data, variables, context) => {
      successCb(data, variables, context)
    },
    onError: (error, variables, context) => {
      errorCb(error, variables, context)
    },
    onSettled: (data, error, variables, context) => {
      settledCb(data, error, variables, context)
    },
    ...config,
  })

  return mutation
}

export default useMutationHandler
