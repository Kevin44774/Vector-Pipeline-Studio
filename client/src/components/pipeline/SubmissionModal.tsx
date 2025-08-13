import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle } from 'lucide-react';

interface SubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  analysisResult: any;
}

export function SubmissionModal({ isOpen, onClose, analysisResult }: SubmissionModalProps) {
  if (!analysisResult) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-slate-800/95 backdrop-blur-xl border-slate-600/50 text-slate-100 max-w-md shadow-2xl animate-container" data-testid="modal-submission-results">
        <DialogHeader>
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center shadow-lg glow-green">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <DialogTitle className="text-xl font-bold text-slate-100">
                Pipeline Analysis Complete
              </DialogTitle>
              <p className="text-sm text-slate-400 mt-1">Your pipeline has been validated</p>
            </div>
          </div>
        </DialogHeader>
        
        <div className="space-y-4 mb-6">
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/80 rounded-xl p-5 space-y-4 border border-slate-700/30 shadow-lg">
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3"/>
                    <circle cx="12" cy="1" r="1"/>
                    <circle cx="12" cy="23" r="1"/>
                    <circle cx="4.22" cy="4.22" r="1"/>
                    <circle cx="19.78" cy="19.78" r="1"/>
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-300">Total Nodes</span>
              </div>
              <span className="text-2xl font-bold text-blue-400" data-testid="text-result-nodes">
                {analysisResult.num_nodes}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                  </svg>
                </div>
                <span className="text-sm font-medium text-slate-300">Connections</span>
              </div>
              <span className="text-2xl font-bold text-green-400" data-testid="text-result-edges">
                {analysisResult.num_edges}
              </span>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 ${analysisResult.is_dag ? 'bg-emerald-500/20' : 'bg-red-500/20'} rounded-lg flex items-center justify-center`}>
                  {analysisResult.is_dag ? (
                    <CheckCircle className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-400" />
                  )}
                </div>
                <span className="text-sm font-medium text-slate-300">Pipeline Status</span>
              </div>
              <Badge 
                variant={analysisResult.is_dag ? "default" : "destructive"}
                className={`${analysisResult.is_dag ? "bg-emerald-500/20 text-emerald-400 border-emerald-400/30 glow-green" : "bg-red-500/20 text-red-400 border-red-400/30"} px-3 py-1 text-sm font-semibold`}
                data-testid="badge-dag-status"
              >
                {analysisResult.is_dag ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Valid DAG
                  </>
                ) : (
                  <>
                    <XCircle className="w-3 h-3 mr-1" />
                    Invalid
                  </>
                )}
              </Badge>
            </div>
          </div>
          
          <div className="text-sm text-slate-400">
            {analysisResult.is_dag 
              ? "Your pipeline is valid and ready for execution. All nodes are properly connected and form a valid directed acyclic graph."
              : "Your pipeline contains cycles or invalid connections. Please review your node connections and ensure they form a valid directed acyclic graph."
            }
          </div>
        </div>
        
        <div className="flex space-x-3">
          <Button
            onClick={onClose}
            variant="outline"
            className="flex-1 bg-slate-700 hover:bg-slate-600 text-slate-100 border-slate-600"
            data-testid="button-close-modal"
          >
            Close
          </Button>
          <Button
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            disabled={!analysisResult.is_dag}
            data-testid="button-execute-pipeline"
          >
            Execute Pipeline
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
