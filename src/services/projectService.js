import { db } from '../firebase';
import { 
  collection, 
  addDoc, 
  doc, 
  updateDoc, 
  deleteDoc, 
  getDoc, 
  getDocs, 
  query, 
  where,
  serverTimestamp,
  orderBy
} from 'firebase/firestore';

// Collection references
const PROJECTS_COLLECTION = 'projects';
const TRACKS_COLLECTION = 'tracks';
const CLIPS_COLLECTION = 'clips';

/**
 * Project Service - Handles all interactions with Firestore for music projects
 */
const projectService = {
  /**
   * Create a new music project
   * @param {string} userId - The ID of the user creating the project
   * @param {object} projectData - The project data
   * @returns {Promise<string>} - The ID of the newly created project
   */
  async createProject(userId, projectData) {
    try {
      const projectRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
        ...projectData,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      });
      
      return projectRef.id;
    } catch (error) {
      console.error('Error creating project:', error);
      throw error;
    }
  },

  /**
   * Get all projects for a specific user
   * @param {string} userId - The ID of the user
   * @returns {Promise<Array>} - An array of project objects
   */
  async getUserProjects(userId) {
    try {
      const projectsQuery = query(
        collection(db, PROJECTS_COLLECTION), 
        where('userId', '==', userId),
        orderBy('updatedAt', 'desc')
      );
      
      const snapshot = await getDocs(projectsQuery);
      return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error fetching user projects:', error);
      throw error;
    }
  },

  /**
   * Get a specific project by ID
   * @param {string} projectId - The ID of the project to fetch
   * @returns {Promise<object>} - The project data
   */
  async getProject(projectId) {
    try {
      const projectDoc = await getDoc(doc(db, PROJECTS_COLLECTION, projectId));
      
      if (!projectDoc.exists()) {
        throw new Error('Project not found');
      }
      
      return {
        id: projectDoc.id,
        ...projectDoc.data()
      };
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  /**
   * Update an existing project
   * @param {string} projectId - The ID of the project to update
   * @param {object} projectData - The updated project data
   * @returns {Promise<void>}
   */
  async updateProject(projectId, projectData) {
    try {
      await updateDoc(doc(db, PROJECTS_COLLECTION, projectId), {
        ...projectData,
        updatedAt: serverTimestamp()
      });
    } catch (error) {
      console.error('Error updating project:', error);
      throw error;
    }
  },

  /**
   * Delete a project
   * @param {string} projectId - The ID of the project to delete
   * @returns {Promise<void>}
   */
  async deleteProject(projectId) {
    try {
      await deleteDoc(doc(db, PROJECTS_COLLECTION, projectId));
    } catch (error) {
      console.error('Error deleting project:', error);
      throw error;
    }
  },

  /**
   * Save the tracks and clips for a project
   * @param {string} projectId - The project ID
   * @param {Array} tracks - Array of track objects with clips
   * @returns {Promise<void>}
   */
  async saveProjectArrangement(projectId, tracks) {
    try {
      // Update timestamps on project
      await updateDoc(doc(db, PROJECTS_COLLECTION, projectId), {
        trackCount: tracks.length,
        updatedAt: serverTimestamp()
      });
      
      // For each track, store in a subcollection
      for (const track of tracks) {
        const trackData = {
          name: track.name,
          color: track.color,
          mute: track.mute,
          solo: track.solo,
          projectId: projectId,
          updatedAt: serverTimestamp()
        };
        
        let trackRef;
        if (track.id && track.id.includes('/')) {
          // Existing track with Firestore path
          trackRef = doc(db, track.id);
          await updateDoc(trackRef, trackData);
        } else {
          // New track
          trackRef = await addDoc(
            collection(db, PROJECTS_COLLECTION, projectId, TRACKS_COLLECTION), 
            trackData
          );
        }
        
        // For each clip in the track, store in a clips subcollection
        if (track.clips && track.clips.length > 0) {
          for (const clip of track.clips) {
            const clipData = {
              name: clip.name,
              start: clip.start,
              length: clip.length,
              trackId: trackRef.id,
              projectId: projectId,
              updatedAt: serverTimestamp()
            };
            
            if (clip.id && clip.id.includes('/')) {
              // Existing clip with Firestore path
              await updateDoc(doc(db, clip.id), clipData);
            } else {
              // New clip
              await addDoc(
                collection(
                  db, 
                  PROJECTS_COLLECTION, 
                  projectId, 
                  TRACKS_COLLECTION, 
                  trackRef.id, 
                  CLIPS_COLLECTION
                ), 
                clipData
              );
            }
          }
        }
      }
    } catch (error) {
      console.error('Error saving project arrangement:', error);
      throw error;
    }
  },

  /**
   * Load the tracks and clips for a project
   * @param {string} projectId - The project ID
   * @returns {Promise<Array>} - Array of track objects with clips
   */
  async loadProjectArrangement(projectId) {
    try {
      const tracksQuery = query(
        collection(db, PROJECTS_COLLECTION, projectId, TRACKS_COLLECTION)
      );
      
      const tracksSnapshot = await getDocs(tracksQuery);
      const tracks = [];
      
      for (const trackDoc of tracksSnapshot.docs) {
        const trackData = trackDoc.data();
        const trackPath = `${PROJECTS_COLLECTION}/${projectId}/${TRACKS_COLLECTION}/${trackDoc.id}`;
        
        // Get clips for this track
        const clipsQuery = query(
          collection(
            db, 
            PROJECTS_COLLECTION, 
            projectId, 
            TRACKS_COLLECTION, 
            trackDoc.id, 
            CLIPS_COLLECTION
          )
        );
        
        const clipsSnapshot = await getDocs(clipsQuery);
        const clips = clipsSnapshot.docs.map(clipDoc => ({
          id: `${trackPath}/${CLIPS_COLLECTION}/${clipDoc.id}`,
          ...clipDoc.data()
        }));
        
        tracks.push({
          id: trackPath,
          ...trackData,
          clips
        });
      }
      
      return tracks;
    } catch (error) {
      console.error('Error loading project arrangement:', error);
      throw error;
    }
  }
};

export default projectService; 