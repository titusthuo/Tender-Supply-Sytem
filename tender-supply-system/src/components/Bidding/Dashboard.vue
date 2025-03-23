<!-- src/components/Bidding/Dashboard.vue -->
<template>
    <div class="min-h-screen bg-gray-100">
      <div class="min-h-screen flex flex-col">
        <div v-if="currentView === 'submission'">
          <BidSubmissionForm @submit-bid="handleBidSubmit" @view-change="handleViewChange" />
        </div>
        <div v-else-if="currentView === 'tracking'">
          <BidStatusTracking :bids="bids" @view-change="handleViewChange" />
        </div>
        <div v-else-if="currentView === 'history'">
          <BidHistoryArchive :bids="bids" @view-change="handleViewChange" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BidSubmissionForm from './BidSubmissionForm.vue';
  import BidStatusTracking from './BidStatusTracking.vue';
  import BidHistoryArchive from './BidHistoryArchive.vue';
  
  const currentView = ref('submission');
  
  // Sample bid data
  const bids = ref([
    {
      id: 'BID-2025-0342',
      projectName: 'Office Building Renovation Project',
      bidAmount: 125000.00,
      submissionDate: 'Mar 10, 2025',
      status: 'Under Review',
      description: 'Complete renovation of 3rd floor offices including...',
      timeline: [
        { step: 'Submission Received', date: 'March 10, 2025 at 2:34 PM', completed: true },
        { step: 'Initial Screening Passed', date: 'March 12, 2025 at 9:15 AM', completed: true },
        { step: 'Technical Evaluation', date: 'Estimated: March 21, 2025', completed: false }
      ]
    },
    {
      id: 'BID-2025-0337',
      projectName: 'City Hall IT Infrastructure',
      bidAmount: 87500.00,
      submissionDate: 'Feb 28, 2025',
      status: 'Accepted',
      description: 'Network upgrades and server room renovation',
      timeline: [
        { step: 'Submission Received', date: 'February 28, 2025 at 11:22 AM', completed: true },
        { step: 'Initial Screening Passed', date: 'March 1, 2025 at 3:45 PM', completed: true },
        { step: 'Technical Evaluation', date: 'March 5, 2025', completed: true },
        { step: 'Final Review', date: 'March 8, 2025', completed: true },
        { step: 'Bid Accepted', date: 'March 10, 2025', completed: true }
      ]
    },
    {
      id: 'BID-2025-0328',
      projectName: 'School District Equipment',
      bidAmount: 65750.00,
      submissionDate: 'Feb 15, 2025',
      status: 'Rejected',
      description: 'Computer lab equipment for high school',
      timeline: [
        { step: 'Submission Received', date: 'February 15, 2025 at 10:30 AM', completed: true },
        { step: 'Initial Screening Passed', date: 'February 17, 2025 at 2:15 PM', completed: true },
        { step: 'Technical Evaluation', date: 'February 22, 2025', completed: true },
        { step: 'Final Review', date: 'February 28, 2025', completed: true },
        { step: 'Bid Rejected', date: 'March 2, 2025', completed: true, rejection: true }
      ]
    },
    {
      id: 'BID-2025-0315',
      projectName: 'Public Library Renovation',
      bidAmount: 95200.00,
      submissionDate: 'Jan 28, 2025',
      status: 'Accepted',
      description: 'Interior renovation of public library west wing',
      timeline: [
        { step: 'Submission Received', date: 'January 28, 2025 at 9:45 AM', completed: true },
        { step: 'Initial Screening Passed', date: 'January 30, 2025 at 11:30 AM', completed: true },
        { step: 'Technical Evaluation', date: 'February 5, 2025', completed: true },
        { step: 'Final Review', date: 'February 10, 2025', completed: true },
        { step: 'Bid Accepted', date: 'February 15, 2025', completed: true }
      ]
    }
  ]);
  
  const handleViewChange = (view) => {
    currentView.value = view;
  };
  
  const handleBidSubmit = (newBid) => {
    // Generate a unique ID
    const bidId = `BID-2025-${Math.floor(1000 + Math.random() * 9000)}`;
    
    // Create a new bid object
    const bidToAdd = {
      id: bidId,
      projectName: newBid.projectTitle,
      bidAmount: parseFloat(newBid.bidAmount),
      submissionDate: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
      status: 'Under Review',
      description: newBid.bidDescription,
      timeline: [
        { 
          step: 'Submission Received', 
          date: new Date().toLocaleString('en-US', { 
            month: 'long', 
            day: '2-digit', 
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          }), 
          completed: true 
        },
        { 
          step: 'Initial Screening', 
          date: 'Pending', 
          completed: false 
        },
        { 
          step: 'Technical Evaluation', 
          date: 'Pending', 
          completed: false 
        }
      ]
    };
    
    // Add the new bid to the bids array
    bids.value.unshift(bidToAdd);
    
    // Switch to the tracking view
    currentView.value = 'tracking';
  };
  </script>