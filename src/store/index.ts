import { reactive } from 'vue';

export const store = reactive({
  comparedProperties: [] as any[],
  recentlyViewed: [] as any[],
  isMortgageModalOpen: false,
  selectedProperty: null as any | null,
  isFiltering: false,
  
  addToCompare(property: any) {
    if (this.comparedProperties.length < 3 && !this.comparedProperties.find(p => p.title === property.title)) {
      this.comparedProperties.push(property);
    }
  },
  
  removeFromCompare(title: string) {
    this.comparedProperties = this.comparedProperties.filter(p => p.title !== title);
  },
  
  addRecentlyViewed(property: any) {
    if (!this.recentlyViewed.find(p => p.title === property.title)) {
      this.recentlyViewed.unshift(property);
      if (this.recentlyViewed.length > 5) this.recentlyViewed.pop();
    }
  },
  
  openMortgageModal(property: any) {
    this.selectedProperty = property;
    this.isMortgageModalOpen = true;
  },
  
  closeMortgageModal() {
    this.isMortgageModalOpen = false;
  }
});
