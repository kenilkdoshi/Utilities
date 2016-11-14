package itemRecom;

import java.io.File;
import java.io.IOException;
import java.util.List;

public class itemRecommonder {

	public static void main(String[] args) {
		try {
			DataModel dm = new FileDataModel(new File("data/movies.csv"));
			
			//ItemSimilarity sim = new LogLikelihoodSimilarity(dm);
			TanimotoCoefficientSimilarity sim = new TanimotoCoefficientSimilarity(dm);
			
			GenericItemBasedRecommender recommender = new GenericItemBasedRecommender(dm, sim);
			
			int x=1;
			for(LongPrimitiveIterator items = dm.getItemIDs(); items.hasNext();) {
				long itemId = items.nextLong();
				List<RecommendedItem>recommendations = recommender.mostSimilarItems(itemId, 5);
				
				for(RecommendedItem recommendation : recommendations) {
					System.out.println(itemId + "," + recommendation.getItemID() + "," + recommendation.getValue());
				}
				x++;
				//if(x>10) System.exit(1);
			}
						
			
			
		} catch (IOException e) {
			System.out.println("There was an error.");
			e.printStackTrace();
		} catch (TasteException e) {
			System.out.println("There was a Taste Exception");
			e.printStackTrace();
		}
		

	}

}
