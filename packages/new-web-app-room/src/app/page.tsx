'use client';

import { useState, useEffect } from 'react';

export default function Calculator() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForOperand) {
      setDisplay(num);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return firstValue / secondValue;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const { key } = event;
      
      if (key >= '0' && key <= '9') {
        inputNumber(key);
      } else if (key === '.') {
        inputDecimal();
      } else if (key === '+') {
        performOperation('+');
      } else if (key === '-') {
        performOperation('-');
      } else if (key === '*') {
        performOperation('×');
      } else if (key === '/') {
        event.preventDefault();
        performOperation('÷');
      } else if (key === 'Enter' || key === '=') {
        performOperation('=');
      } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clear();
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [display, previousValue, operation, waitingForOperand]);

  const Button = ({ 
    onClick, 
    className = '', 
    children 
  }: { 
    onClick: () => void; 
    className?: string; 
    children: React.ReactNode;
  }) => (
    <button
      onClick={onClick}
      className={`h-16 text-xl font-semibold rounded-lg transition-all duration-150 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-white/20">
        <div className="w-80">
          {/* Display */}
          <div className="bg-black/30 rounded-lg p-4 mb-4 text-right">
            <div className="text-3xl font-mono text-white min-h-[2.5rem] flex items-center justify-end overflow-hidden">
              {display}
            </div>
          </div>

          {/* Button Grid */}
          <div className="grid grid-cols-4 gap-3">
            {/* Row 1 */}
            <Button
              onClick={clear}
              className="col-span-2 bg-red-500 hover:bg-red-600 text-white"
            >
              Clear
            </Button>
            <Button
              onClick={() => performOperation('÷')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              ÷
            </Button>
            <Button
              onClick={() => performOperation('×')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              ×
            </Button>

            {/* Row 2 */}
            <Button
              onClick={() => inputNumber('7')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              7
            </Button>
            <Button
              onClick={() => inputNumber('8')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              8
            </Button>
            <Button
              onClick={() => inputNumber('9')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              9
            </Button>
            <Button
              onClick={() => performOperation('-')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              -
            </Button>

            {/* Row 3 */}
            <Button
              onClick={() => inputNumber('4')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              4
            </Button>
            <Button
              onClick={() => inputNumber('5')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              5
            </Button>
            <Button
              onClick={() => inputNumber('6')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              6
            </Button>
            <Button
              onClick={() => performOperation('+')}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              +
            </Button>

            {/* Row 4 */}
            <Button
              onClick={() => inputNumber('1')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              1
            </Button>
            <Button
              onClick={() => inputNumber('2')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              2
            </Button>
            <Button
              onClick={() => inputNumber('3')}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              3
            </Button>
            <Button
              onClick={() => performOperation('=')}
              className="row-span-2 bg-green-500 hover:bg-green-600 text-white"
            >
              =
            </Button>

            {/* Row 5 */}
            <Button
              onClick={() => inputNumber('0')}
              className="col-span-2 bg-gray-700 hover:bg-gray-600 text-white"
            >
              0
            </Button>
            <Button
              onClick={inputDecimal}
              className="bg-gray-700 hover:bg-gray-600 text-white"
            >
              .
            </Button>
          </div>

          {/* Instructions */}
          <div className="mt-4 text-center text-white/70 text-sm">
            Use your keyboard or click the buttons
          </div>
        </div>
      </div>
    </div>
  );
}







