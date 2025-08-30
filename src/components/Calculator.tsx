import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const Calculator = () => {
  const [calculation, setCalculation] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [lastOperation, setLastOperation] = useState<string | null>(null);
  const { theme, setTheme } = useTheme();

  const handleNumberClick = (num: string) => {
    if (result === '0' || lastOperation === '=') {
      setResult(num);
      if (lastOperation === '=') {
        setCalculation('');
      }
    } else {
      setResult(result + num);
    }
    setLastOperation(null);
  };

  const handleDecimalClick = () => {
    if (lastOperation === '=') {
      setResult('0.');
      setCalculation('');
      setLastOperation(null);
      return;
    }
    
    if (!result.includes('.')) {
      setResult(result + '.');
    }
  };

  const handleOperationClick = (operation: string) => {
    if (lastOperation === '=') {
      setCalculation(result + ' ' + operation);
    } else if (lastOperation && lastOperation !== '=') {
      // Replace the last operation
      setCalculation(calculation.slice(0, -1) + operation);
    } else {
      setCalculation(calculation + result + ' ' + operation);
    }
    setResult('0');
    setLastOperation(operation);
  };

  const handleClearClick = () => {
    setCalculation('');
    setResult('0');
    setLastOperation(null);
  };

  const handleEqualsClick = () => {
    if (!calculation || lastOperation === '=') return;

    try {
      // Create a full expression for evaluation
      const fullExpression = calculation + result;
      
      // Replace the operation symbols with JavaScript operators
      const expressionForEval = fullExpression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/\s/g, '');
      
      // Use Function constructor to safely evaluate the expression
      // eslint-disable-next-line no-new-func
      const calculatedResult = new Function('return ' + expressionForEval)();
      
      // Format the result
      const formattedResult = Number.isInteger(calculatedResult)
        ? calculatedResult.toString()
        : calculatedResult.toFixed(8).replace(/\.?0+$/, '');
      
      setCalculation(fullExpression + ' =');
      setResult(formattedResult);
      setLastOperation('=');
    } catch (error) {
      setResult('Error');
    }
  };

  const handlePercentClick = () => {
    const value = parseFloat(result) / 100;
    setResult(value.toString());
  };

  const handleToggleSign = () => {
    if (result === '0') return;
    setResult(result.startsWith('-') ? result.slice(1) : '-' + result);
  };

  return (
    <Card className="calculator-container w-full max-w-md shadow-lg">
      <div className="calculator-display">
        <div className="calculation text-sm opacity-70 h-6 overflow-hidden">
          {calculation}
        </div>
        <div className="result text-4xl font-bold truncate">
          {result}
        </div>
      </div>
      
      <CardContent className="p-2">
        <div className="flex justify-between items-center mb-2 px-2">
          <div className="flex items-center space-x-2">
            <Sun className="h-4 w-4" />
            <Switch 
              checked={theme === 'dark'}
              onCheckedChange={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            />
            <Moon className="h-4 w-4" />
          </div>
          <Label className="text-xs opacity-70">Simple Calculator</Label>
        </div>
        
        <div className="calculator-buttons">
          <Button 
            onClick={handleClearClick} 
            className="calculator-button clear-button"
            variant="destructive"
          >
            C
          </Button>
          <Button 
            onClick={handleToggleSign} 
            className="calculator-button operation-button"
            variant="outline"
          >
            ±
          </Button>
          <Button 
            onClick={handlePercentClick} 
            className="calculator-button operation-button"
            variant="outline"
          >
            %
          </Button>
          <Button 
            onClick={() => handleOperationClick('÷')} 
            className="calculator-button operation-button"
            variant="secondary"
          >
            ÷
          </Button>
          
          <Button 
            onClick={() => handleNumberClick('7')} 
            className="calculator-button number-button"
            variant="outline"
          >
            7
          </Button>
          <Button 
            onClick={() => handleNumberClick('8')} 
            className="calculator-button number-button"
            variant="outline"
          >
            8
          </Button>
          <Button 
            onClick={() => handleNumberClick('9')} 
            className="calculator-button number-button"
            variant="outline"
          >
            9
          </Button>
          <Button 
            onClick={() => handleOperationClick('×')} 
            className="calculator-button operation-button"
            variant="secondary"
          >
            ×
          </Button>
          
          <Button 
            onClick={() => handleNumberClick('4')} 
            className="calculator-button number-button"
            variant="outline"
          >
            4
          </Button>
          <Button 
            onClick={() => handleNumberClick('5')} 
            className="calculator-button number-button"
            variant="outline"
          >
            5
          </Button>
          <Button 
            onClick={() => handleNumberClick('6')} 
            className="calculator-button number-button"
            variant="outline"
          >
            6
          </Button>
          <Button 
            onClick={() => handleOperationClick('-')} 
            className="calculator-button operation-button"
            variant="secondary"
          >
            -
          </Button>
          
          <Button 
            onClick={() => handleNumberClick('1')} 
            className="calculator-button number-button"
            variant="outline"
          >
            1
          </Button>
          <Button 
            onClick={() => handleNumberClick('2')} 
            className="calculator-button number-button"
            variant="outline"
          >
            2
          </Button>
          <Button 
            onClick={() => handleNumberClick('3')} 
            className="calculator-button number-button"
            variant="outline"
          >
            3
          </Button>
          <Button 
            onClick={() => handleOperationClick('+')} 
            className="calculator-button operation-button"
            variant="secondary"
          >
            +
          </Button>
          
          <Button 
            onClick={() => handleNumberClick('0')} 
            className="calculator-button number-button zero-button"
            variant="outline"
          >
            0
          </Button>
          <Button 
            onClick={handleDecimalClick} 
            className="calculator-button number-button"
            variant="outline"
          >
            .
          </Button>
          <Button 
            onClick={handleEqualsClick} 
            className="calculator-button equals-button"
            variant="default"
          >
            =
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Calculator;
