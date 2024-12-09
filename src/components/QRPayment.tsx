import { QRCodeSVG } from 'qrcode.react'
import { Upload, Check, AlertCircle } from 'lucide-react'
import { useState } from 'react'

interface QRPaymentProps {
  amount: number;
  onComplete: (transactionId: string, paymentProof: string) => void;
}

export default function QRPayment({ amount, onComplete }: QRPaymentProps) {
  const [transactionId, setTransactionId] = useState('')
  const [paymentProof, setPaymentProof] = useState<string>('')
  const [error, setError] = useState('')

  // Payment details
  const paymentUrl = `pay://amount=${amount}&recipient=CampusHub&account=1234567890`

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!transactionId.trim()) {
      setError('Please enter the transaction ID first')
      return
    }
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPaymentProof(reader.result as string)
        setError('')
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!transactionId.trim()) {
      setError('Please enter the transaction ID')
      return
    }
    if (!paymentProof) {
      setError('Please upload the payment proof')
      return
    }
    onComplete(transactionId, paymentProof)
  }

  return (
    <div className="text-center max-w-md mx-auto">
      <h3 className="text-xl font-semibold mb-6">Complete Payment</h3>
      
      {/* QR Code Section */}
      <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm mb-6">
        <div className="flex justify-center mb-4">
          <QRCodeSVG 
            value={paymentUrl}
            size={200}
            level="H"
            includeMargin={true}
          />
        </div>
        
        <div className="text-left space-y-2 mb-4">
          <div>
            <span className="text-gray-500">Amount:</span>
            <span className="ml-2 font-semibold">${amount.toFixed(2)}</span>
          </div>
          <div>
            <span className="text-gray-500">Account:</span>
            <span className="ml-2">1234567890</span>
          </div>
        </div>
      </div>

      {/* Payment Verification Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Step 1: Transaction ID */}
        <div className="relative">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
              1
            </span>
            Enter Transaction ID
          </label>
          <input
            type="text"
            value={transactionId}
            onChange={(e) => {
              setTransactionId(e.target.value)
              if (e.target.value.trim()) {
                setError('')
              }
            }}
            className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="Enter the transaction ID from your payment"
            required
          />
          {transactionId && (
            <Check className="absolute right-3 top-9 w-5 h-5 text-green-500" />
          )}
        </div>

        {/* Step 2: Payment Proof */}
        <div className="relative">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            <span className="flex items-center justify-center w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 text-xs font-bold">
              2
            </span>
            Upload Payment Proof
          </label>
          <div className={`relative border-2 border-dashed rounded-lg p-4 transition-colors
            ${!transactionId.trim() ? 'bg-gray-50 cursor-not-allowed' : 'cursor-pointer hover:border-indigo-500'}
            ${paymentProof ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="absolute inset-0 w-full h-full opacity-0"
              disabled={!transactionId.trim()}
              required
            />
            <div className="flex flex-col items-center">
              {paymentProof ? (
                <>
                  <Check className="w-6 h-6 text-green-500 mb-2" />
                  <span className="text-sm text-green-600">
                    Screenshot uploaded - Click to change
                  </span>
                </>
              ) : (
                <>
                  <Upload className={`w-6 h-6 mb-2 ${!transactionId.trim() ? 'text-gray-400' : 'text-indigo-500'}`} />
                  <span className={`text-sm ${!transactionId.trim() ? 'text-gray-400' : 'text-gray-600'}`}>
                    {!transactionId.trim() 
                      ? 'Enter transaction ID first'
                      : 'Upload payment screenshot'}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="flex items-center gap-2 text-red-500 text-sm">
            <AlertCircle className="w-4 h-4" />
            <p>{error}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded transition-colors
            ${(!transactionId.trim() || !paymentProof)
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-700'
            } text-white`}
          disabled={!transactionId.trim() || !paymentProof}
        >
          Submit Payment
        </button>
      </form>
    </div>
  )
}
