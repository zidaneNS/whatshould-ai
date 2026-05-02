interface ErrorInputProps {
  errorMessage: string | string[]
}

export default function ErrorInput({
  errorMessage
}: ErrorInputProps) {
  return (
    <p className="text-red-500 bg-red-100/70 w-full text-sm rounded-md py-2 px-4">{errorMessage}</p>
  )
}